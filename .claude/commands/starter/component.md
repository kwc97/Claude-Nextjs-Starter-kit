---
description: '새로운 컴포넌트를 자동 생성합니다 (UI/Common/Layout/Section/Form)'
allowed-tools:
  [
    'Write',
    'Read',
    'Glob',
    'Edit',
  ]
---

# Claude 명령어: Component

새로운 React 컴포넌트를 템플릿 기반으로 자동 생성하는 명령어입니다.

## 사용법

```
/component
```

또는 컴포넌트 이름과 함께:

```
/component Modal
/component pricing-card --type ui
/component dashboard-stats --type sections
```

## 주요 기능

1. **다양한 컴포넌트 타입 지원**
   - `ui`: shadcn/ui 스타일 기본 UI 컴포넌트
   - `common`: Container, Section 등 공통 컴포넌트
   - `layout`: Header, Footer, Navigation 등 레이아웃
   - `sections`: Hero, Features 등 페이지 섹션
   - `forms`: react-hook-form + zod 기반 폼

2. **자동 템플릿 생성**
   - TypeScript 인터페이스 자동 생성
   - React 19 패턴 적용
   - 프로젝트 코딩 스타일 준수 (2칸 들여쓰기)

3. **스마트 네이밍**
   - kebab-case 입력을 PascalCase로 자동 변환
   - 파일명과 컴포넌트명 자동 매칭

## 상세한 프로세스

### 1단계: 컴포넌트 정보 수집

대화형 메뉴를 통해 다음 정보를 수집합니다:

```
📦 컴포넌트 생성기

1. 컴포넌트 타입을 선택하세요:
   • ui - 기본 UI 컴포넌트 (Button, Input 등)
   • common - 공통 컴포넌트 (Container, Logo 등)
   • layout - 레이아웃 컴포넌트 (Header, Footer 등)
   • sections - 페이지 섹션 (Hero, Features 등)
   • forms - 폼 컴포넌트 (react-hook-form + zod)

2. 컴포넌트 이름 입력:
   예: Modal, pricing-card, dashboard-stats
```

### 2단계: 중복 확인

- 같은 이름의 컴포넌트가 있는지 확인
- 있다면 덮어쓰기 여부를 물어봄

### 3단계: 템플릿 기반 파일 생성

컴포넌트 타입별로 적절한 템플릿을 생성합니다.

### 4단계: 생성 완료 및 안내

- 생성된 파일 경로 표시
- import 경로 예시 제공
- 다음 단계 안내

## 컴포넌트 템플릿

### UI 컴포넌트 템플릿

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // 추가 props 정의
}

export function ComponentName({ className, ...props }: ComponentNameProps) {
  return (
    <div className={cn("", className)} {...props}>
      {/* 컴포넌트 내용 */}
    </div>
  );
}
```

### Common 컴포넌트 템플릿

```typescript
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ComponentNameProps {
  children: ReactNode;
  className?: string;
}

export function ComponentName({ children, className }: ComponentNameProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
```

### Layout 컴포넌트 템플릿

```typescript
import { ReactNode } from "react";

interface ComponentNameProps {
  children?: ReactNode;
}

export function ComponentName({ children }: ComponentNameProps) {
  return (
    <div>
      {/* 레이아웃 구조 */}
      {children}
    </div>
  );
}
```

### Section 컴포넌트 템플릿

```typescript
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

export function ComponentName() {
  return (
    <Section id="section-id" className="py-20">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold">섹션 제목</h2>
          <p className="mt-4 text-muted-foreground">
            섹션 설명
          </p>
        </div>
      </Container>
    </Section>
  );
}
```

### Form 컴포넌트 템플릿

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Zod 스키마 정의 (lib/validations/에 별도 파일로 분리 권장)
const formSchema = z.object({
  field: z.string().min(1, "필수 입력 항목입니다."),
});

type FormData = z.infer<typeof formSchema>;

export function ComponentName() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // 폼 제출 로직
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="field">필드 레이블</Label>
        <Input
          id="field"
          {...register("field")}
          placeholder="입력하세요"
        />
        {errors.field && (
          <p className="mt-1 text-sm text-destructive">
            {errors.field.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        제출
      </Button>
    </form>
  );
}
```

## 대화형 옵션

실행 시 다음 옵션을 선택할 수 있습니다:

- **컴포넌트 타입**: ui, common, layout, sections, forms
- **컴포넌트 이름**: kebab-case 또는 PascalCase
- **추가 옵션**:
  - `--with-styles`: 별도 CSS 파일 생성 여부
  - `--client`: "use client" 지시어 추가 여부 (기본: 자동 판단)

## 사용 예시

### 1. UI 컴포넌트 생성

```bash
# Dialog 컴포넌트 생성
/component Dialog --type ui

# 결과
✓ components/ui/dialog.tsx 생성 완료

# Import 경로
import { Dialog } from "@/components/ui/dialog";
```

### 2. 섹션 컴포넌트 생성

```bash
# Testimonials 섹션 생성
/component Testimonials --type sections

# 결과
✓ components/sections/testimonials.tsx 생성 완료

# Import 경로
import { Testimonials } from "@/components/sections/testimonials";
```

### 3. 폼 컴포넌트 생성

```bash
# Contact 폼 생성
/component ContactForm --type forms

# 결과
✓ components/forms/contact-form.tsx 생성 완료
ℹ️ Zod 스키마를 lib/validations/contact.ts로 분리하는 것을 권장합니다.

# Import 경로
import { ContactForm } from "@/components/forms/contact-form";
```

## 생성 후 작업

### 1. Import 추가
생성된 컴포넌트를 사용할 파일에 import를 추가합니다:

```typescript
import { ComponentName } from "@/components/[type]/component-name";
```

### 2. 컴포넌트 사용
페이지나 다른 컴포넌트에서 사용합니다:

```typescript
<ComponentName />
```

### 3. 스타일 커스터마이징
필요에 따라 Tailwind 클래스를 수정하거나 추가합니다.

### 4. Props 확장
인터페이스에 필요한 props를 추가합니다.

## 고급 옵션

### 클라이언트 컴포넌트 지정

폼, 대화형 UI 등은 자동으로 "use client"가 추가되지만, 수동으로 지정할 수도 있습니다:

```bash
/component InteractiveMap --type common --client
```

### 여러 컴포넌트 한번에 생성

```bash
/component Modal Dialog Popover --type ui
```

### 템플릿 커스터마이징

프로젝트 루트의 `.claude/templates/` 폴더에 커스텀 템플릿을 만들 수 있습니다.

## 통합 기능

### /section 명령어와 연동
섹션 컴포넌트를 생성한 후 바로 페이지에 추가:

```bash
/component Testimonials --type sections --add-to-page
```

### Zod 스키마 자동 생성
폼 컴포넌트 생성 시 자동으로 validation 스키마 파일도 생성:

```bash
/component SignupForm --type forms --with-validation
```

## 문제 해결

### Q: 컴포넌트가 생성되었지만 import 오류가 발생합니다
**A**: TypeScript 서버를 재시작하거나, `@/*` 경로 별칭이 tsconfig.json에 올바르게 설정되어 있는지 확인하세요.

### Q: 생성된 컴포넌트 스타일이 적용되지 않습니다
**A**: Tailwind CSS 설정을 확인하고, `npm run dev`로 개발 서버를 재시작하세요.

### Q: 특정 타입의 컴포넌트만 생성하고 싶습니다
**A**: `--type` 옵션을 사용하거나, 대화형 메뉴에서 선택하세요.

### Q: 기존 컴포넌트를 수정하려고 합니다
**A**: 이 명령어는 새 컴포넌트 생성 전용입니다. 기존 컴포넌트는 직접 수정하거나 Edit 도구를 사용하세요.
