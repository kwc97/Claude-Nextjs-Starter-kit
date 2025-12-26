import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function Contact() {
  return (
    <Section id="contact" className="bg-muted/50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            최신 소식 받기
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            새로운 기능과 업데이트 소식을 이메일로 받아보세요
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
