---
description: '페이지에 섹션 컴포넌트를 추가하거나 새로 생성합니다'
allowed-tools:
  [
    'Read',
    'Edit',
    'Write',
    'Glob',
  ]
---

# Claude 명령어: Section

페이지에 섹션 컴포넌트를 추가하거나 새로 생성하는 명령어입니다.

## 사용법

```
/section
```

또는 섹션 이름과 함께:

```
/section Testimonials
/section pricing --page examples
/section cta --create
```

## 주요 기능

1. **기존 섹션 추가**
   - 프로젝트의 모든 섹션 컴포넌트 자동 탐색
   - 선택한 페이지에 import 및 컴포넌트 추가
   - 적절한 위치에 자동 삽입

2. **새 섹션 생성 및 추가**
   - 섹션 컴포넌트 생성
   - 바로 페이지에 추가
   - Navigation 자동 업데이트 옵션

3. **스마트 배치**
   - 섹션 순서 자동 제안
   - Hero는 최상단, Footer 직전에 삽입
   - 사용자 지정 위치 선택 가능

## 상세한 프로세스

### 1단계: 대상 페이지 선택

```
📄 섹션 추가할 페이지를 선택하세요:

1. app/page.tsx (메인 페이지)
2. app/examples/page.tsx (예제 페이지)
3. 다른 페이지 경로 입력
```

### 2단계: 섹션 선택 또는 생성

```
📦 작업을 선택하세요:

1. 기존 섹션 추가
2. 새 섹션 생성 후 추가
```

#### 옵션 1: 기존 섹션 추가

사용 가능한 섹션 목록을 표시합니다:

```
사용 가능한 섹션:
✓ Hero (components/sections/hero.tsx)
✓ Features (components/sections/features.tsx)
✓ Pricing (components/sections/pricing.tsx)
✓ Contact (components/sections/contact.tsx)

추가할 섹션을 선택하세요:
```

#### 옵션 2: 새 섹션 생성

```
새 섹션 이름을 입력하세요:
예: Testimonials, CTA, Team

섹션 레이아웃을 선택하세요:
1. 중앙 정렬 (Hero 스타일)
2. 그리드 (Features 스타일)
3. 카드 (Pricing 스타일)
4. 커스텀 (빈 템플릿)
```

### 3단계: 삽입 위치 선택

```
📍 섹션을 추가할 위치:

1. 최상단 (첫 번째 섹션)
2. Hero 다음
3. Features 다음
4. 최하단 (Footer 직전)
5. 사용자 지정 위치
```

### 4단계: Import 및 컴포넌트 추가

- 페이지 파일 상단에 import 문 추가
- 선택한 위치에 컴포넌트 태그 삽입
- 기존 코드 포맷 유지

### 5단계: Navigation 업데이트 (선택사항)

```
🧭 Navigation에 이 섹션을 추가하시겠습니까?

섹션 ID: testimonials
메뉴 제목: 고객 후기
```

config/navigation.ts에 자동 추가됩니다.

### 6단계: 완료 및 확인

```
✓ Testimonials 섹션이 app/page.tsx에 추가되었습니다
✓ Navigation이 업데이트되었습니다

변경사항:
- Import 추가: import { Testimonials } from "@/components/sections/testimonials"
- 컴포넌트 추가: <Testimonials /> (Features 다음)
- Navigation 추가: { title: "고객 후기", href: "#testimonials" }

다음 단계:
1. 개발 서버에서 확인: http://localhost:3000
2. 섹션 내용 커스터마이징
3. 스타일 조정
```

## 섹션 템플릿

### 중앙 정렬 레이아웃

```typescript
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

export function SectionName() {
  return (
    <Section id="section-id" className="py-20">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            섹션 제목
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            섹션 설명 텍스트
          </p>
        </div>
      </Container>
    </Section>
  );
}
```

### 그리드 레이아웃

```typescript
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

export function SectionName() {
  return (
    <Section id="section-id" className="py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold">섹션 제목</h2>
          <p className="mt-4 text-muted-foreground">섹션 설명</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* 그리드 아이템 */}
        </div>
      </Container>
    </Section>
  );
}
```

### 카드 레이아웃

```typescript
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function SectionName() {
  return (
    <Section id="section-id" className="py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold">섹션 제목</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드 설명</CardDescription>
            </CardHeader>
            <CardContent>
              {/* 카드 내용 */}
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
```

## 대화형 옵션

- **페이지 선택**: 메인, 예제, 또는 커스텀 페이지
- **섹션 작업**: 기존 추가 또는 새로 생성
- **위치 선택**: 최상단, 특정 섹션 다음, 최하단
- **Navigation 추가**: 자동 메뉴 항목 생성
- **섹션 ID**: 자동 생성 또는 사용자 지정

## 사용 예시

### 1. 기존 섹션을 메인 페이지에 추가

```bash
/section

# 대화형 프로세스
페이지: app/page.tsx 선택
작업: 기존 섹션 추가
섹션: Pricing 선택
위치: Features 다음
Navigation: 추가 (제목: "가격", ID: #pricing)

# 결과
✓ Pricing 섹션이 추가되었습니다
```

### 2. 새 섹션 생성 후 추가

```bash
/section Testimonials --create

# 대화형 프로세스
페이지: app/page.tsx
레이아웃: 그리드 선택
위치: Pricing 다음
Navigation: 추가

# 결과
✓ components/sections/testimonials.tsx 생성
✓ app/page.tsx에 추가
✓ Navigation 업데이트
```

### 3. 예제 페이지에 섹션 추가

```bash
/section CTA --page examples

# 결과
✓ CTA 섹션이 app/examples/page.tsx에 추가되었습니다
```

## 섹션 배치 전략

### 일반적인 랜딩 페이지 구조

```
1. Hero (최상단)
2. Features (주요 기능)
3. Benefits (혜택)
4. Testimonials (고객 후기)
5. Pricing (가격)
6. FAQ (자주 묻는 질문)
7. CTA (행동 유도)
8. Contact (연락처)
```

### 순서 제안
명령어가 자동으로 적절한 순서를 제안합니다:
- Hero는 항상 최상단
- CTA는 Footer 직전
- Features는 Hero 다음
- Testimonials는 Pricing 근처

## 고급 기능

### 섹션 ID 자동 생성

섹션 이름에서 자동으로 kebab-case ID 생성:
- `Testimonials` → `testimonials`
- `CallToAction` → `call-to-action`

### 조건부 렌더링 추가

```bash
/section Pricing --with-condition

# 생성되는 코드
{isAuthenticated && <Pricing />}
```

### 애니메이션 추가

```bash
/section Features --with-animation

# Framer Motion 또는 CSS 애니메이션 추가
```

### 섹션 데이터 분리

```bash
/section Team --with-data

# lib/constants/team.ts에 데이터 파일 생성
# 컴포넌트에서 import하여 사용
```

## Navigation 통합

### 자동 메뉴 항목 생성

섹션 추가 시 `config/navigation.ts`에 자동으로 메뉴 항목이 추가됩니다:

```typescript
export const navigationConfig = {
  main: [
    // 기존 항목들
    {
      title: "새 섹션",
      href: "#section-id",
    },
  ],
};
```

### 메뉴 순서 조정

Navigation 항목은 섹션 순서와 동일하게 정렬됩니다.

## 통합 기능

### /component 명령어와 연동

```bash
# 컴포넌트 생성 후 바로 섹션으로 추가
/component Testimonials --type sections --add-to-page
```

### Git 자동 커밋

```bash
/section Team --commit

# 변경사항을 자동으로 커밋
```

## 문제 해결

### Q: 섹션이 추가되었지만 페이지에 표시되지 않습니다
**A**:
1. import 경로가 올바른지 확인
2. 섹션 ID가 중복되지 않는지 확인
3. 개발 서버 재시작

### Q: Navigation 링크가 작동하지 않습니다
**A**:
1. 섹션 ID와 href가 일치하는지 확인 (`#section-id`)
2. Section 컴포넌트에 `id` prop이 전달되었는지 확인

### Q: 페이지 레이아웃이 깨졌습니다
**A**:
1. 섹션을 `<main>` 태그 안에 추가했는지 확인
2. Footer는 `<main>` 밖에 있어야 함
3. Header는 페이지 최상단에 한 번만

### Q: 여러 섹션을 한번에 추가하고 싶습니다
**A**:
```bash
/section Features Pricing Testimonials --batch
```

### Q: 섹션 순서를 변경하고 싶습니다
**A**: 이 명령어는 추가 전용입니다. 순서 변경은 파일을 직접 편집하거나 Edit 도구를 사용하세요.

## 다음 단계

섹션 추가 후:
1. ✅ 섹션 내용 커스터마이징
2. ✅ 이미지 및 아이콘 추가
3. ✅ 반응형 디자인 확인
4. ✅ 접근성 검토 (ARIA 레이블 등)
5. ✅ SEO 최적화 (제목, 메타 태그)
