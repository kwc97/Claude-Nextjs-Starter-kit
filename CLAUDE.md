# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 📚 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [개발 명령어](#3-개발-명령어)
4. [아키텍처 및 구조](#4-아키텍처-및-구조)
5. [Claude Code 통합 시스템](#5-claude-code-통합-시스템)
6. [MCP 서버 설정](#6-mcp-서버-설정)
7. [개발 워크플로우](#7-개발-워크플로우)
8. [개발 가이드](#8-개발-가이드)
9. [문제 해결](#9-문제-해결)

---

## 1. 프로젝트 개요

**Claude Code 통합 개발 도구 시스템**

단순한 Next.js 스타터킷이 아니라, Claude Code와 완벽하게 통합된 전문 개발 환경입니다:

- ✅ **7개의 전문 에이전트**: 코드 리뷰, 개발 계획, Next.js 전문가, UI 마크업, PRD 관리 등
- ✅ **7개의 자동화 명령어**: Git 워크플로우, 컴포넌트 생성, 섹션 추가, Vercel 배포
- ✅ **Slack 알림 통합**: 권한 요청 시 자동 알림 및 승인
- ✅ **MCP 서버**: 브라우저 자동화, 문서 검색, AI 사고 체인

모던 랜딩 페이지를 빠르게 구축하면서 동시에 강력한 개발 자동화 도구를 활용할 수 있습니다.

---

## 2. 기술 스택

### 핵심 프레임워크
- **Next.js** 16.1.1 (App Router)
- **React** 19.2.3 + React DOM 19.2.3
- **TypeScript** 5+

### UI & 스타일링
- **Tailwind CSS** v4 (@import 방식, OKLch 색상 공간)
- **shadcn/ui** + **Radix UI** (접근성 프리미티브)
- **class-variance-authority** 0.7.1 (CVA 패턴)
- **lucide-react** 0.562.0 (아이콘)
- **next-themes** 0.4.6 (다크모드 지원)

### 폼 & 유효성 검사
- **react-hook-form** 7.69.0
- **@hookform/resolvers** 5.2.2
- **zod** 4.2.1

### 유틸리티
- **tailwind-merge** 3.4.0 (클래스 병합)
- **clsx** 2.1.1 (조건부 클래스)
- **tw-animate-css** 1.4.0 (애니메이션)

### 폰트
- **Geist Sans / Geist Mono** (Google Fonts)

---

## 3. 개발 명령어

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

---

## 4. 아키텍처 및 구조

### 앱 라우팅 (App Router)

**페이지 구조:**
- `app/layout.tsx`: 루트 레이아웃, Geist 폰트, Providers로 래핑
- `app/providers.tsx`: next-themes의 ThemeProvider 설정 (다크모드)
- `app/page.tsx`: 메인 랜딩 페이지 (Hero, Features)
- `app/examples/page.tsx`: 컴포넌트 예제 페이지 (버튼, 뱃지, 카드 등)
- `app/not-found.tsx`: 커스텀 404 페이지

### 컴포넌트 계층 구조

#### UI 컴포넌트 (`components/ui/`)
shadcn/ui 기반의 재사용 가능한 기본 컴포넌트 (Radix UI primitives + Tailwind CSS + CVA)

- **Button**: 6가지 variant (default, secondary, destructive, outline, ghost, link) + 3가지 크기, `asChild` prop 지원
- **Card**: 기본 + Header + Footer + Title + Description + Action + Content (8개 서브컴포넌트)
- **Input**: type 지원, 에러 상태, 포커스 스타일, `aria-invalid` 접근성
- **Label**: Radix UI 기반, 접근성 완벽 지원
- **Badge**: 4가지 variant (default, secondary, destructive, outline), `asChild` prop
- **Separator**: Radix UI 구분선 (horizontal/vertical)
- **Sheet**: Radix UI 기반 모달/드로어 (모바일 네비게이션용)

**고급 패턴:**
- `asChild` prop: Radix Slot 패턴으로 컴포넌트 합성
- CVA (class-variance-authority): 타입 안전 variant 시스템

#### 공통 컴포넌트 (`components/common/`)
- **Container**: 반응형 컨테이너 래퍼 (max-w-7xl), 제네릭 타입 지원 (`<E extends ElementType = "div">`)
- **Section**: 섹션 래퍼 (id와 className 지원, py-20 md:py-24)
- **Logo**: 사이트 로고 컴포넌트 (링크 기반)
- **ThemeToggle**: 다크/라이트 모드 전환 버튼 (Sun/Moon 아이콘 애니메이션)

#### 레이아웃 컴포넌트 (`components/layout/`)
- **Header**: 고정 헤더 (sticky, z-50, 백드롭 블러), "use client"
- **Footer**: 푸터 (사이트 정보, 소셜 링크, 저작권)
- **Navigation**: 데스크톱 네비게이션 (md:flex, 모바일 숨김)
- **MobileNav**: 모바일 네비게이션 (Sheet 기반, 테마 토글 포함)

#### 섹션 컴포넌트 (`components/sections/`)
- **Hero**: 히어로 섹션 (gradient 텍스트, CTA 버튼)
- **Features**: 기능 소개 섹션 (3열 그리드, 아이콘 + 제목 + 설명)
- **Pricing**: 가격 플랜 섹션 (3가지 플랜, popular 강조, Check 아이콘)
- **Contact**: 연락처/뉴스레터 섹션 (폼 포함)

#### 폼 컴포넌트 (`components/forms/`)
- **NewsletterForm**: react-hook-form + zod 기반, 제출 상태, 성공 메시지

### 설정 파일

#### 사이트 설정 (`config/`)
- **site.ts**: 사이트 메타데이터 (이름, 설명, URL, OG 이미지, 소셜 링크)
- **navigation.ts**: 네비게이션 메뉴 항목 설정 (main 배열)

#### 유효성 검사 (`lib/validations/`)
- zod 스키마 정의
- 예: `newsletter.ts` (이메일 유효성 검사)

#### 상수 (`lib/constants/`)
- 애플리케이션 상수 정의
- 예: `features.ts` (기능 목록 데이터, 아이콘 포함)

### 스타일링

**Tailwind CSS v4 (최신 방식):**
```css
/* app/globals.css */
@import "tailwindcss";
@plugin "tw-animate-css";

@theme inline {
  /* OKLch 색상 공간 */
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  /* ... */
}

@custom-variant dark (&:is(.dark *));
```

**특징:**
- CSS 변수 기반 테마 시스템 (light/dark mode)
- `cn()` 유틸리티: tailwind-merge + clsx (조건부 클래스 병합)
- OKLch 색상 공간 사용
- 차트 색상 (5개), 사이드바 색상, 반경 변수

### 타입 정의

- **types/index.ts**: 공통 타입 정의
  - `NavLink`: 네비게이션 링크
  - `Feature`: 기능 아이템
  - `PricingPlan`: 가격 플랜
  - `NewsletterFormData`: 뉴스레터 폼 데이터
- **@/* 경로 별칭**: 절대 경로 import 사용

### 테마 시스템

- **next-themes** 라이브러리 사용
- CSS 변수 기반 (light/dark 모드)
- `suppressHydrationWarning` 속성으로 hydration 경고 방지
- 시스템 테마 자동 감지 지원
- 전환 애니메이션 비활성화 (깜빡임 방지)

---

## 5. Claude Code 통합 시스템

### 5.1 전문 에이전트 (`.claude/agents/`)

#### 개발 에이전트 (`dev/`)

- **code-reviewer.md**: 코드 품질 자동 검토 (한국어 리뷰, 로직 검증, 성능 분석)
- **development-planner.md**: ROADMAP.md 관리 (Phase별 Task 생성/업데이트)
- **nextjs-app-developer.md**: Next.js App Router 전문가 (페이지 구조, 라우팅, 레이아웃)
- **starter-cleaner.md**: 스타터킷 초기화 (불필요한 예제 코드 제거)
- **ui-markup-specialist.md**: UI/마크업 전문 (정적 마크업, Tailwind, Shadcn UI)

#### 문서 에이전트 (`docs/`)

- **prd-generator.md**: PRD(Product Requirements Document) 생성
- **prd-validator.md**: PRD 기술 검증 (Chain-of-Thought 추론)

**사용법:**
```bash
# 자동으로 호출되거나 Task 도구로 직접 호출
# 예: 코드 작성 후 자동 리뷰, ROADMAP 업데이트 시 자동 호출
```

### 5.2 커스텀 명령어 (`.claude/commands/`)

#### Git 워크플로우

- **/commit**: 이모지 + 컨벤셔널 커밋 생성
  - `feat:`, `fix:`, `docs:` 등 자동 prefix
  - Co-Authored-By: Claude 서명 포함

- **/branch**: 브랜치 관리 (생성/전환/삭제)
  - 안전한 브랜치 작업
  - 미병합 브랜치 경고

- **/merge**: 안전한 브랜치 병합
  - 충돌 감지 및 해결 가이드
  - Fast-forward 옵션

- **/pr**: GitHub Pull Request 생성/관리
  - gh CLI 기반
  - PR 템플릿 자동 생성

#### Starter Kit 개발 도구

**1. /component - 컴포넌트 자동 생성**

5가지 타입 지원:
- `ui`: shadcn/ui 스타일 기본 UI 컴포넌트
- `common`: Container, Section 등 공통 컴포넌트
- `layout`: Header, Footer, Navigation 등
- `sections`: Hero, Features 등 페이지 섹션
- `forms`: react-hook-form + zod 기반 폼

특징:
- kebab-case → PascalCase 자동 변환
- TypeScript 인터페이스 자동 생성
- React 19 패턴 적용
- 중복 확인 및 덮어쓰기 경고

사용 예시:
```bash
/component Modal --type ui
/component ContactForm --type forms
/component Testimonials --type sections
```

**2. /section - 섹션 추가/생성**

기능:
- 기존 섹션을 페이지에 추가
- 새 섹션 컴포넌트 생성
- navigation.ts 자동 업데이트
- 스마트 순서 배치 (Hero → Features → ... → Contact)

사용 예시:
```bash
/section  # 대화형 메뉴
```

**3. /deploy - Vercel 배포**

배포 전 자동 점검:
- ✅ 빌드 테스트 (`npm run build`)
- ✅ 린트 검사 (`npm run lint`)
- ✅ 타입 체크 (`tsc --noEmit`)
- ✅ 환경변수 검증

환경 선택:
- Production
- Preview (브랜치별)
- Development

배포 후:
- 배포 URL 확인
- Lighthouse 성능 점수 (선택)

사용 예시:
```bash
/deploy  # 대화형 메뉴
```

### 5.3 훅 시스템 (`.claude/hooks/`)

#### notification-hook.py

**기능:**
- 권한 요청 시 Slack 알림 전송
- 자동 권한 승인 기능 (PermissionRequest hook)
- UTF-8 인코딩 처리 (Windows 호환)
- 상세 로깅 (`notification-hook.log`)

**환경변수 설정:**
```bash
# .env 파일에 추가
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**알림 내용:**
- 🔔 권한 요청 알림
- 프로젝트명
- 메시지 내용
- 시간 정보

#### stop-hook.py

**기능:**
- 작업 중지 시 알림

---

## 6. MCP 서버 설정 (`.mcp.json`)

### playwright
**브라우저 자동화 테스트**
```json
{
  "type": "stdio",
  "command": "npx",
  "args": ["@playwright/mcp@latest"]
}
```
- 웹 페이지 테스트 자동화
- 스크린샷, 네비게이션, 폼 작성

### context7
**라이브러리 문서 실시간 검색**
```json
{
  "type": "http",
  "url": "https://mcp.context7.com/mcp"
}
```
- Next.js, React, Tailwind 등 최신 문서 검색
- 코드 예제 제공

### sequential-thinking
**AI 사고 체인 (복잡한 문제 해결)**
```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
}
```
- 복잡한 문제를 단계별로 분해
- Chain-of-Thought 추론

---

## 7. 개발 워크플로우

### 7.1 컴포넌트 개발

```bash
# 1. 컴포넌트 생성
/component Modal --type ui

# 2. 페이지에서 import
import { Modal } from "@/components/ui/modal";

# 3. 사용
<Modal>...</Modal>
```

### 7.2 섹션 추가

```bash
# 1. 섹션 컴포넌트 생성
/component Testimonials --type sections

# 2. 페이지에 추가
/section

# 3. navigation.ts 자동 업데이트 확인
```

### 7.3 Git 워크플로우

```bash
# 1. 브랜치 생성
/branch

# 2. 코드 작성
# ... 개발 ...

# 3. 커밋 (이모지 자동 추가)
/commit

# 4. PR 생성
/pr
```

### 7.4 배포

```bash
# 1. 배포 명령어 실행 (자동 점검 포함)
/deploy

# 2. 환경 선택 (Production/Preview/Development)

# 3. 배포 완료 후 URL 확인
```

---

## 8. 개발 가이드

### 8.1 Tailwind CSS v4 특징

**새로운 @import 방식:**
```css
@import "tailwindcss";
@plugin "tw-animate-css";
```

**@theme inline:**
```css
@theme inline {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --radius: 0.5rem;
}
```

**@custom-variant:**
```css
@custom-variant dark (&:is(.dark *));
```

**OKLch 색상 공간:**
- 더 정확한 색상 보간
- 인간 친화적 색상 표현

### 8.2 폼 개발 패턴

**1단계: lib/validations/에 Zod 스키마 정의**
```typescript
// lib/validations/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다"),
  email: z.string().email("유효한 이메일을 입력해주세요"),
  message: z.string().min(10, "메시지는 최소 10자 이상이어야 합니다"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

**2단계: 폼 컴포넌트에서 react-hook-form 사용**
```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // 폼 제출 로직
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 폼 필드 */}
    </form>
  );
}
```

**3단계: 에러 메시지 표시**
```typescript
{errors.email && (
  <p className="mt-1 text-sm text-destructive">
    {errors.email.message}
  </p>
)}
```

### 8.3 다크모드 구현

**1단계: Providers 설정 (이미 완료)**
```typescript
// app/providers.tsx
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
```

**2단계: suppressHydrationWarning 추가 (이미 완료)**
```typescript
// app/layout.tsx
<html lang="ko" suppressHydrationWarning>
```

**3단계: ThemeToggle 컴포넌트 사용**
```typescript
import { ThemeToggle } from "@/components/common/theme-toggle";

<ThemeToggle />
```

### 8.4 컴포넌트 패턴

#### UI 컴포넌트 (Radix UI + CVA)
```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

#### Common 컴포넌트 (제네릭 타입)
```typescript
import type { ElementType, ComponentPropsWithoutRef } from "react";

interface ContainerProps<E extends ElementType = "div"> {
  as?: E;
  children: ReactNode;
  className?: string;
}

export function Container<E extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ContainerProps<E> & Omit<ComponentPropsWithoutRef<E>, keyof ContainerProps<E>>) {
  const Component = as || "div";
  return (
    <Component className={cn("container", className)} {...props}>
      {children}
    </Component>
  );
}
```

#### Section 컴포넌트 (Container + Section 래핑)
```typescript
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

export function MySection() {
  return (
    <Section id="my-section" className="py-20">
      <Container>
        {/* 섹션 내용 */}
      </Container>
    </Section>
  );
}
```

### 8.5 새로운 UI 컴포넌트 추가

**shadcn/ui 추가:**
```bash
npx shadcn@latest add [component-name]
```

**또는 /component 명령어 사용:**
```bash
/component ComponentName --type ui
```

**패턴 준수:**
- Radix UI primitives 사용
- CVA로 variant 정의
- cn() 유틸리티로 className 병합
- asChild prop 지원 (Slot 패턴)

### 8.6 새로운 섹션 추가

**방법 1: /component로 생성 후 /section으로 추가**
```bash
/component Testimonials --type sections
/section
```

**방법 2: 수동 추가**
1. `components/sections/`에 컴포넌트 생성
2. Section 컴포넌트로 래핑
3. `app/page.tsx`에서 import 및 배치
4. `config/navigation.ts`에 링크 추가

### 8.7 설정 변경

**사이트 메타데이터:**
```typescript
// config/site.ts
export const siteConfig = {
  name: "사이트 이름",
  description: "사이트 설명",
  url: "https://example.com",
  ogImage: "https://example.com/og.png",
  links: {
    twitter: "https://twitter.com/username",
    github: "https://github.com/username",
  },
};
```

**네비게이션:**
```typescript
// config/navigation.ts
export const navigationConfig = {
  main: [
    { title: "홈", href: "#hero" },
    { title: "기능", href: "#features" },
    { title: "가격", href: "#pricing" },
  ],
};
```

---

## 9. 문제 해결

### Slack 알림이 작동하지 않음

**해결 방법:**
1. `.env` 파일 확인:
   ```bash
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   ```
2. Webhook URL이 유효한지 확인
3. `.claude/hooks/notification-hook.log` 로그 확인

### 컴포넌트 생성 후 import 오류

**해결 방법:**
1. `tsconfig.json`의 `@/*` 경로 별칭 확인:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```
2. TypeScript 서버 재시작 (VSCode: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")

### Tailwind CSS 스타일이 적용되지 않음

**해결 방법:**
1. `npm run dev` 개발 서버 재시작
2. `app/globals.css`에서 `@import "tailwindcss";` 확인
3. 브라우저 캐시 삭제 (Cmd/Ctrl + Shift + R)

### 다크모드 깜빡임 (Flash of unstyled content)

**해결 방법:**
1. `app/layout.tsx`에 `suppressHydrationWarning` 추가 확인:
   ```typescript
   <html lang="ko" suppressHydrationWarning>
   ```
2. `app/providers.tsx`에 `disableTransitionOnChange` 확인:
   ```typescript
   <ThemeProvider disableTransitionOnChange>
   ```

### 배포 전 점검 실패

**해결 방법:**
```bash
# /deploy 명령어가 자동으로 다음을 점검합니다:

# 1. 빌드 테스트
npm run build

# 2. 린트 검사
npm run lint

# 3. 타입 체크
npx tsc --noEmit

# 각 단계에서 오류 발생 시 수정 후 재시도
```

### 환경변수 관련 오류

**체크리스트:**
```bash
# .env 파일 생성
touch .env

# 필수 환경변수 확인
SLACK_WEBHOOK_URL=...  # Slack 알림용 (선택)

# .gitignore에 .env 추가 확인
echo ".env" >> .gitignore
```

---

## 📖 Quick Reference

### 자주 사용하는 명령어

```bash
# 컴포넌트 생성
/component [이름] --type [ui|common|layout|sections|forms]

# 섹션 추가
/section

# 커밋
/commit

# 배포
/deploy
```

### 프로젝트 구조 빠른 참조

```
claude-nextjs-starters/
├── app/                  # Next.js App Router
├── components/           # 컴포넌트
│   ├── ui/              # shadcn/ui
│   ├── common/          # 공통
│   ├── layout/          # 레이아웃
│   ├── sections/        # 섹션
│   └── forms/           # 폼
├── config/              # 설정
├── lib/                 # 유틸리티
│   ├── constants/       # 상수
│   └── validations/     # Zod 스키마
├── types/               # 타입 정의
└── .claude/             # Claude Code 통합
    ├── agents/          # 7개 에이전트
    ├── commands/        # 7개 명령어
    └── hooks/           # 훅 시스템
```

### Import 경로 예시

```typescript
// UI 컴포넌트
import { Button } from "@/components/ui/button";

// 공통 컴포넌트
import { Container } from "@/components/common/container";

// 섹션
import { Hero } from "@/components/sections/hero";

// 설정
import { siteConfig } from "@/config/site";

// 유틸리티
import { cn } from "@/lib/utils";

// 타입
import type { NavLink } from "@/types";
```

---

## 개발 시 주의사항

### 새로운 UI 컴포넌트 추가
shadcn/ui 스타일을 따라 `components/ui/`에 추가하고, Radix UI primitives + CVA 패턴 사용

### 새로운 섹션 추가
`components/sections/`에 추가하고, Section 컴포넌트로 래핑

### 폼 추가
react-hook-form + zod 패턴 사용, `lib/validations/`에 스키마 정의

### 설정 변경
`config/site.ts`와 `config/navigation.ts`에서 사이트 메타데이터 및 네비게이션 수정

### 에이전트 활용
코드 작성 후 자동 리뷰, ROADMAP 관리, PRD 생성/검증 등을 자동화

### MCP 서버 활용
브라우저 테스트, 최신 문서 검색, 복잡한 문제 해결에 활용
