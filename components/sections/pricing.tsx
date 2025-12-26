import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { PricingPlan } from "@/types";

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "₩0",
    description: "개인 프로젝트에 적합",
    features: [
      "기본 컴포넌트",
      "다크모드",
      "반응형 디자인",
      "커뮤니티 지원",
    ],
    cta: "시작하기",
  },
  {
    name: "Pro",
    price: "₩29,000",
    description: "전문가를 위한 플랜",
    features: [
      "모든 Free 기능",
      "프리미엄 컴포넌트",
      "우선 지원",
      "고급 템플릿",
      "상업적 이용 가능",
    ],
    popular: true,
    cta: "구매하기",
  },
  {
    name: "Enterprise",
    price: "맞춤 견적",
    description: "기업을 위한 솔루션",
    features: [
      "모든 Pro 기능",
      "전담 지원팀",
      "커스터마이징 서비스",
      "SLA 보장",
      "온사이트 교육",
    ],
    cta: "문의하기",
  },
];

export function Pricing() {
  return (
    <Section id="pricing">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            합리적인 가격
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            프로젝트 규모에 맞는 플랜을 선택하세요
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="bg-primary text-primary-foreground">
                    인기
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "맞춤 견적" && (
                    <span className="text-muted-foreground">/월</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
