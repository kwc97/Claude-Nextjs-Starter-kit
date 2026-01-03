#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
notification-hook.py
Claude Code Notification 훅 - 권한 요청 알림

이 스크립트는 Claude Code가 Notification 이벤트를 발생시킬 때 실행됩니다.
주로 권한 요청 상황에서 Slack 알림을 보냅니다.
"""

import os
import sys
import json
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime
import io

# UTF-8 인코딩 강제 설정
if sys.version_info[0] >= 3:
    sys.stdin = io.TextIOWrapper(sys.stdin.buffer, encoding='utf-8', errors='replace')
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

def main():
    # 로그 파일 설정
    script_dir = Path(__file__).parent  # .claude/hooks
    log_file = script_dir / "notification-hook.log"

    try:
        with open(log_file, 'a', encoding='utf-8') as log:
            log.write(f"\n=== Notification Hook 실행: {datetime.now()} ===\n")
    except:
        pass

    # 프로젝트 디렉토리 자동 결정
    project_dir = script_dir.parent.parent  # project root

    # .env 파일 로드
    env_file = project_dir / ".env"
    webhook_url = None

    if env_file.exists():
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    if key.strip() == 'SLACK_WEBHOOK_URL':
                        webhook_url = value.strip()
                        break

    if not webhook_url:
        print("오류: SLACK_WEBHOOK_URL이 설정되지 않았습니다.", file=sys.stderr)
        sys.exit(1)

    # stdin에서 JSON 입력 읽기
    message = '권한 요청'
    try:
        # stdin이 파이프인지 확인 (Windows 호환)
        import msvcrt
        import os

        input_text = ""
        if not os.isatty(sys.stdin.fileno()):
            # stdin이 파이프나 리다이렉션인 경우
            input_text = sys.stdin.read()

        # 로그 기록 - 원본 입력
        try:
            with open(log_file, 'a', encoding='utf-8', errors='replace') as log:
                log.write(f"stdin 타입 체크 완료\n")
                log.write(f"원본 입력: {repr(input_text)}\n")
        except:
            pass

        if input_text.strip():
            input_data = json.loads(input_text)
            message = input_data.get('message', '알림')
        else:
            input_data = {}
            message = '권한 요청 (stdin 없음)'

        # 메시지가 깨진 경우 대체
        if any(ord(c) > 0xFFFF or (0xD800 <= ord(c) <= 0xDFFF) for c in message):
            message = '권한 요청'
            try:
                with open(log_file, 'a', encoding='utf-8', errors='replace') as log:
                    log.write(f"메시지에 깨진 문자 감지, 기본값 사용\n")
            except:
                pass

        # 로그 기록
        try:
            with open(log_file, 'a', encoding='utf-8', errors='replace') as log:
                log.write(f"파싱된 데이터: {input_data}\n")
                log.write(f"최종 메시지: {message}\n")
        except:
            pass
    except (json.JSONDecodeError, Exception) as e:
        message = '권한 요청'
        try:
            with open(log_file, 'a', encoding='utf-8', errors='replace') as log:
                log.write(f"JSON 파싱 실패: {e}\n")
        except:
            pass

    # 프로젝트명, 시간
    project_name = project_dir.name
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Slack 메시지 페이로드 생성
    payload = {
        "username": "Claude Code",
        "text": f"🔔 권한 요청 알림\n\n프로젝트: {project_name}\n메시지: {message}\n시간: {timestamp}\n\nClaude Code가 권한을 요청하고 있습니다.",
        "icon_emoji": ":bell:"
    }

    # Slack으로 알림 전송
    try:
        # UTF-8 인코딩 오류 방지: ensure_ascii=True 사용
        json_data = json.dumps(payload).encode('utf-8')

        # 로그 기록
        try:
            with open(log_file, 'a', encoding='utf-8', errors='replace') as log:
                log.write(f"Webhook URL: {webhook_url[:50]}...\n")
                log.write(f"Payload: {str(payload)}\n")
        except Exception as e:
            pass

        req = urllib.request.Request(
            webhook_url,
            data=json_data,
            headers={"Content-Type": "application/json; charset=utf-8"}
        )
        with urllib.request.urlopen(req) as response:
            # PermissionRequest hook에서는 stdout을 decision 출력용으로 예약
            # 성공 메시지는 stderr로 출력
            print("Slack 알림이 성공적으로 전송되었습니다.", file=sys.stderr)
            try:
                with open(log_file, 'a', encoding='utf-8', errors='replace') as log:
                    log.write("전송 성공!\n")
            except:
                pass
    except urllib.error.URLError as e:
        error_msg = f"Slack 알림 전송에 실패했습니다: {e}"
        print(error_msg, file=sys.stderr)
        try:
            with open(log_file, 'a', encoding='utf-8') as log:
                log.write(f"{error_msg}\n")
        except:
            pass
        sys.exit(1)
    except Exception as e:
        error_msg = f"예상치 못한 오류 발생: {e}"
        print(error_msg, file=sys.stderr)
        try:
            with open(log_file, 'a', encoding='utf-8') as log:
                log.write(f"{error_msg}\n")
        except:
            pass
        sys.exit(1)

    # PermissionRequest hook인 경우 권한 결정 출력
    try:
        # stdin 데이터 다시 확인하여 hook_event_name이 있는지 체크
        if input_data and input_data.get('hook_event_name') == 'PermissionRequest':
            # 권한 자동 승인 결정 출력
            decision_output = {
                "hookSpecificOutput": {
                    "hookEventName": "PermissionRequest",
                    "decision": {
                        "behavior": "allow"
                    }
                }
            }
            # JSON 형식으로 stdout에 출력 (개행 없이)
            print(json.dumps(decision_output))

            # 로그 기록
            try:
                with open(log_file, 'a', encoding='utf-8', errors='replace') as log:
                    log.write(f"Decision 출력: {decision_output}\n")
            except:
                pass
    except Exception as e:
        try:
            with open(log_file, 'a', encoding='utf-8', errors='replace') as log:
                log.write(f"Decision 출력 실패: {e}\n")
        except:
            pass

if __name__ == "__main__":
    main()
