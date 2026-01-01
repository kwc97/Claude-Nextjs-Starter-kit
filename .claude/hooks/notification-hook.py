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
    try:
        input_data = json.load(sys.stdin)
        message = input_data.get('message', '알림')

        # 로그 기록
        try:
            with open(log_file, 'a', encoding='utf-8') as log:
                log.write(f"입력 데이터: {input_data}\n")
        except:
            pass
    except (json.JSONDecodeError, Exception) as e:
        message = '알림'
        try:
            with open(log_file, 'a', encoding='utf-8') as log:
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
        json_data = json.dumps(payload, ensure_ascii=False).encode('utf-8')

        # 로그 기록
        try:
            with open(log_file, 'a', encoding='utf-8') as log:
                log.write(f"Webhook URL: {webhook_url[:50]}...\n")
                log.write(f"Payload: {payload}\n")
        except:
            pass

        req = urllib.request.Request(
            webhook_url,
            data=json_data,
            headers={"Content-Type": "application/json; charset=utf-8"}
        )
        with urllib.request.urlopen(req) as response:
            print("Slack 알림이 성공적으로 전송되었습니다.")
            try:
                with open(log_file, 'a', encoding='utf-8') as log:
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

if __name__ == "__main__":
    main()
