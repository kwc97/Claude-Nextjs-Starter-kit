# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + ShadcnUI 기반의 모던 랜딩 페이지 스타터킷입니다.

## 개발 명령어

```bash
# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 실행
npm run lint
```

## 아키텍처 및 구조

### 앱 라우팅 (App Router)

- Next.js 16 App Router 사용
- `app/layout.tsx`: 루트 레이아웃, ThemeProvider를 포함한 Providers로 래핑
- `app/providers.tsx`: next-themes의 ThemeProvider 설정 (다크모드 지원)
- `app/page.tsx`: 메인 랜딩 페이지 (Hero, Features 섹션 포함)
- `app/examples/page.tsx`: 다양한 섹션 컴포넌트 예제 페이지

### 컴포넌트 계층 구조

**UI 컴포넌트** (`components/ui/`)
- shadcn/ui 기반의 재사용 가능한 기본 컴포넌트
- Radix UI primitives + Tailwind CSS + CVA(class-variance-authority)
- 예: Button, Input, Label, Card, Badge, Separator, Sheet

**공통 컴포넌트** (`components/common/`)
- `Container`: 반응형 컨테이너 래퍼
- `Section`: 섹션 래퍼 (id와 className 지원)
- `Logo`: 사이트 로고 컴포넌트
- `ThemeToggle`: 다크/라이트 모드 전환 버튼

**레이아웃 컴포넌트** (`components/layout/`)
- `Header`: 고정 헤더 (로고, 네비게이션, 테마 토글 포함)
- `Footer`: 푸터 (사이트 정보, 소셜 링크)
- `Navigation`: 데스크톱 네비게이션
- `MobileNav`: 모바일 네비게이션 (Sheet 컴포넌트 사용)

**섹션 컴포넌트** (`components/sections/`)
- `Hero`: 히어로 섹션 (메인 타이틀, CTA 버튼)
- `Features`: 기능 소개 섹션 (그리드 레이아웃)
- `Pricing`: 가격 플랜 섹션 (카드 레이아웃)
- `Contact`: 연락처 섹션

**폼 컴포넌트** (`components/forms/`)
- react-hook-form + zod 사용
- 예: `NewsletterForm` (이메일 수집 폼)

### 설정 파일

**사이트 설정** (`config/`)
- `site.ts`: 사이트 메타데이터 (이름, 설명, URL, OG 이미지, 소셜 링크)
- `navigation.ts`: 네비게이션 메뉴 항목 설정

**유효성 검사** (`lib/validations/`)
- zod 스키마 정의
- 예: `newsletter.ts` (이메일 유효성 검사)

**상수** (`lib/constants/`)
- 애플리케이션 상수 정의
- 예: `features.ts` (기능 목록 데이터)

### 스타일링

- Tailwind CSS v4 사용
- `app/globals.css`: 전역 스타일, CSS 변수 기반 테마 시스템
- `cn()` 유틸리티: tailwind-merge + clsx (조건부 클래스 병합)

### 타입 정의

- `types/index.ts`: 공통 타입 정의
- `@/*` 경로 별칭으로 절대 경로 import 사용

### 테마 시스템

- next-themes 라이브러리 사용
- CSS 변수 기반 (light/dark 모드)
- `suppressHydrationWarning` 속성으로 hydration 경고 방지
- 시스템 테마 자동 감지 지원

## 개발 시 주의사항

### 새로운 UI 컴포넌트 추가
shadcn/ui 스타일을 따라 `components/ui/`에 추가하고, Radix UI primitives + CVA 패턴 사용

### 새로운 섹션 추가
`components/sections/`에 추가하고, Section 컴포넌트로 래핑

### 폼 추가
react-hook-form + zod 패턴 사용, `lib/validations/`에 스키마 정의

### 설정 변경
`config/site.ts`와 `config/navigation.ts`에서 사이트 메타데이터 및 네비게이션 수정
