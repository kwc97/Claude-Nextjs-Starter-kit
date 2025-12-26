---
description: 'Vercel에 프로젝트를 배포합니다 (사전 점검 포함)'
allowed-tools:
  [
    'Bash(npm run build:*)',
    'Bash(npm run lint:*)',
    'Bash(vercel:*)',
    'Bash(git status:*)',
    'Bash(git add:*)',
    'Bash(git commit:*)',
    'Bash(git push:*)',
    'Read',
    'Glob',
  ]
---

# Claude 명령어: Deploy

Vercel에 프로젝트를 배포하는 명령어입니다. 배포 전 자동 점검을 수행하여 안전한 배포를 보장합니다.

## 사용법

```
/deploy
```

또는 환경을 지정하여:

```
/deploy production
/deploy preview
/deploy --skip-checks
```

## 주요 기능

1. **배포 전 자동 점검**
   - ✅ 빌드 성공 여부
   - ✅ 린트 에러 확인
   - ✅ TypeScript 타입 에러
   - ✅ Git 커밋 상태

2. **다양한 배포 환경**
   - `production`: 프로덕션 배포 (메인 도메인)
   - `preview`: 프리뷰 배포 (PR/브랜치별 URL)
   - `development`: 개발 배포

3. **스마트 환경변수 관리**
   - .env 파일 확인
   - 누락된 환경변수 경고
   - Vercel 환경변수 동기화 확인

## 상세한 프로세스

### 1단계: 배포 환경 선택

```
🚀 배포 환경을 선택하세요:

1. Production (프로덕션)
   - 메인 도메인에 배포
   - main 브랜치에서만 가능
   - 완전한 검증 필요

2. Preview (프리뷰)
   - 임시 URL에 배포
   - 모든 브랜치에서 가능
   - 테스트 및 리뷰용

3. Development (개발)
   - 개발 환경 배포
   - 빠른 테스트용
```

### 2단계: 사전 점검 실행

#### 2-1. Git 상태 확인

```bash
# 커밋되지 않은 변경사항 확인
git status

# 결과
✓ 모든 변경사항이 커밋되었습니다
또는
⚠️ 커밋되지 않은 변경사항이 있습니다:
  - app/page.tsx
  - components/sections/hero.tsx

커밋하시겠습니까? (Y/n)
```

#### 2-2. 빌드 테스트

```bash
# Next.js 프로덕션 빌드
npm run build

# 결과
✓ 빌드 성공 (12.3s)
  - Route (app)                              Size
  ┌ ○ /                                      142 kB
  └ ○ /examples                              156 kB

또는
✗ 빌드 실패
  오류: app/page.tsx에서 타입 에러 발견
```

#### 2-3. 린트 검사

```bash
# ESLint 실행
npm run lint

# 결과
✓ 린트 통과

또는
⚠️ 3개의 경고 발견
✗ 2개의 에러 발견
```

#### 2-4. TypeScript 타입 체크

```bash
# TypeScript 컴파일러 체크
npx tsc --noEmit

# 결과
✓ 타입 체크 통과

또는
✗ 타입 에러 발견:
  app/page.tsx(12,5): Type 'string' is not assignable to type 'number'
```

### 3단계: 환경변수 확인

```
🔐 환경변수 확인 중...

로컬 환경변수 (.env.local):
✓ NEXT_PUBLIC_API_URL
✓ DATABASE_URL
✗ NEXT_PUBLIC_GA_ID (누락)

Vercel 환경변수와 동기화하시겠습니까? (Y/n)
```

### 4단계: 배포 실행

```bash
# Vercel CLI로 배포
vercel --prod  # production
vercel         # preview

# 배포 진행 상황
🔨 Building...
⚡️ Deploying...
✓ Deployment ready

# 배포 정보
🎉 배포 완료!

배포 URL: https://your-app.vercel.app
Dashboard: https://vercel.com/your-team/your-app
```

### 5단계: 배포 후 확인

```
✅ 배포 후 점검:

1. 사이트 접근성 확인
   URL: https://your-app.vercel.app
   상태: ✓ 200 OK

2. 핵심 페이지 확인
   ✓ / (홈페이지)
   ✓ /examples (예제 페이지)

3. 성능 점수 (Lighthouse)
   Performance: 95
   Accessibility: 100
   Best Practices: 100
   SEO: 100

다음 단계:
- 실제 URL에서 기능 테스트
- 모바일 반응형 확인
- 브라우저 호환성 체크
```

## 배포 체크리스트

### 필수 점검 항목
- [ ] 빌드 성공
- [ ] 린트 통과
- [ ] 타입 에러 없음
- [ ] 모든 변경사항 커밋
- [ ] 환경변수 설정 완료

### 권장 점검 항목
- [ ] 이미지 최적화
- [ ] SEO 메타태그 확인
- [ ] OG 이미지 설정
- [ ] 404 페이지 확인
- [ ] 로봇 텍스트 확인
- [ ] sitemap.xml 생성

### 프로덕션 배포 추가 점검
- [ ] 메인 브랜치에서 배포
- [ ] 버전 태그 생성
- [ ] 체인지로그 업데이트
- [ ] 모니터링 설정 확인

## 배포 시나리오

### 시나리오 1: 정상 배포

```
/deploy production

→ Git 상태 확인: ✓
→ 빌드 테스트: ✓
→ 린트 검사: ✓
→ 타입 체크: ✓
→ 환경변수: ✓
→ Vercel 배포: ✓

✅ 배포 완료! https://your-app.vercel.app
```

### 시나리오 2: 빌드 실패

```
/deploy production

→ Git 상태 확인: ✓
→ 빌드 테스트: ✗

❌ 빌드 실패로 배포가 중단되었습니다

에러 내용:
  Module not found: Can't resolve '@/components/missing'

문제를 해결한 후 다시 시도하세요.
또는 --skip-build 옵션으로 빌드 검사를 건너뛸 수 있습니다.
```

### 시나리오 3: 커밋 필요

```
/deploy production

→ Git 상태 확인: ⚠️

커밋되지 않은 변경사항:
  M app/page.tsx
  M components/sections/hero.tsx

자동으로 커밋하시겠습니까? (Y/n)
커밋 메시지: [입력 대기]

> 배포 전 변경사항 커밋

→ 변경사항 커밋: ✓
→ 빌드 테스트: ✓
...
```

## 대화형 옵션

### 배포 환경
- **Production**: 프로덕션 배포
- **Preview**: 프리뷰 배포
- **Development**: 개발 환경 배포

### 점검 옵션
- **전체 점검**: 모든 사전 검사 실행 (기본)
- **빠른 배포**: 최소한의 검사만 실행
- **점검 건너뛰기**: 검사 없이 바로 배포 (위험)

### 배포 후 작업
- **도메인 열기**: 배포된 URL을 브라우저에서 열기
- **Dashboard 열기**: Vercel 대시보드 열기
- **배포 공유**: 배포 URL 복사

## 고급 옵션

### 점검 건너뛰기

긴급 배포 시 (권장하지 않음):

```bash
/deploy --skip-checks
/deploy --skip-build
/deploy --skip-lint
```

### 환경변수 설정

```bash
/deploy --set-env

# 대화형으로 환경변수 입력
KEY: NEXT_PUBLIC_API_URL
VALUE: https://api.example.com
ENVIRONMENT: production
```

### 도메인 지정

```bash
/deploy --domain custom-domain.com
```

### 빌드 명령 커스터마이징

```bash
/deploy --build-command "npm run build:custom"
```

### 롤백

이전 배포로 되돌리기:

```bash
/deploy rollback

# 최근 배포 목록 표시
1. v1.2.3 - 2시간 전 (현재)
2. v1.2.2 - 1일 전
3. v1.2.1 - 3일 전

되돌릴 버전을 선택하세요: 2

→ v1.2.2로 롤백 중...
✓ 롤백 완료
```

## Vercel CLI 설정

### 초기 설정

```bash
# Vercel CLI 설치 (아직 설치하지 않은 경우)
npm install -g vercel

# Vercel 로그인
vercel login

# 프로젝트 연결
vercel link
```

### 환경변수 관리

```bash
# 환경변수 목록
vercel env ls

# 환경변수 추가
vercel env add VARIABLE_NAME

# 환경변수 삭제
vercel env rm VARIABLE_NAME
```

## 환경변수 체크리스트

### Next.js 필수 환경변수

```bash
# Public (클라이언트에서 접근 가능)
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=

# Private (서버에서만 접근)
DATABASE_URL=
API_SECRET_KEY=
```

### Vercel 환경별 설정

- **Production**: 프로덕션 API, 실제 데이터베이스
- **Preview**: 스테이징 API, 테스트 데이터베이스
- **Development**: 로컬 API, 개발 데이터베이스

## 통합 기능

### Git 자동 커밋

커밋되지 않은 변경사항을 자동으로 커밋하고 배포:

```bash
/deploy --auto-commit
```

### PR 배포

Pull Request와 연동하여 자동 배포:

```bash
/deploy --pr 123
```

### 배포 알림

배포 완료 시 슬랙/디스코드에 알림:

```bash
/deploy --notify slack
```

## 사용 예시

### 1. 프로덕션 배포

```bash
/deploy production

# 전체 점검 후 배포
✓ 모든 점검 통과
✓ 배포 완료
🎉 https://your-app.vercel.app
```

### 2. 프리뷰 배포

```bash
/deploy preview

# 빠른 배포 (간소화된 점검)
✓ 빌드 성공
✓ 배포 완료
🔗 https://your-app-git-feature-team.vercel.app
```

### 3. 긴급 핫픽스 배포

```bash
/deploy production --skip-lint --auto-commit

# 린트 건너뛰고 즉시 배포
⚠️ 린트 검사를 건너뛰었습니다
✓ 빌드 성공
✓ 배포 완료
```

## 문제 해결

### Q: "vercel: command not found" 오류
**A**: Vercel CLI를 설치하세요:
```bash
npm install -g vercel
```

### Q: 빌드는 성공하는데 배포 후 에러 발생
**A**:
1. 환경변수가 Vercel에 설정되어 있는지 확인
2. Vercel 대시보드에서 빌드 로그 확인
3. 서버/클라이언트 컴포넌트 구분 확인

### Q: 배포 후 이전 버전이 표시됨
**A**:
1. 브라우저 캐시 삭제
2. Vercel 캐시 초기화: `vercel --force`
3. 5-10분 정도 대기 (CDN 전파 시간)

### Q: 환경변수가 반영되지 않음
**A**:
1. Vercel 대시보드에서 환경변수 확인
2. 환경 (Production/Preview/Development) 확인
3. 배포 후 재빌드 필요: `vercel --force`

### Q: 도메인 설정이 안됨
**A**:
1. Vercel 대시보드에서 도메인 추가
2. DNS 설정 확인 (A 레코드 또는 CNAME)
3. SSL 인증서 발급 대기 (최대 24시간)

## 배포 Best Practices

### 1. 배포 전 체크리스트 활용

```
□ 로컬에서 빌드 테스트
□ 모든 변경사항 커밋
□ 린트 및 타입 에러 해결
□ 환경변수 확인
□ README 및 문서 업데이트
```

### 2. 브랜치 전략

```
main → Production 배포
develop → Preview 배포
feature/* → Preview 배포 (PR마다)
```

### 3. 버전 관리

```bash
# 배포 전 버전 태그 생성
git tag v1.2.3
git push --tags

# 체인지로그 업데이트
```

### 4. 모니터링 설정

- Vercel Analytics 활성화
- Sentry 또는 에러 트래킹 설정
- 성능 모니터링 (Web Vitals)

## 다음 단계

배포 완료 후:
1. ✅ 배포 URL 접속 확인
2. ✅ 주요 기능 테스트
3. ✅ 모바일 반응형 확인
4. ✅ 성능 점수 확인 (Lighthouse)
5. ✅ SEO 메타태그 확인
6. ✅ 팀에 배포 알림
7. ✅ 모니터링 대시보드 확인
