import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

export function Hero() {
  return (
    <Section id="hero" className="pt-32 pb-20">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">모던 웹 개발을</span>
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              빠르게 시작하세요
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Next.js 16, React 19, TypeScript, Tailwind CSS v4, ShadcnUI를 활용한
            <br className="hidden sm:block" />
            프로덕션 준비 완료된 스타터킷입니다.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="#features">시작하기</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
