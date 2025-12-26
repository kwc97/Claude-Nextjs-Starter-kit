"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  newsletterSchema,
  type NewsletterFormData,
} from "@/lib/validations/newsletter";

export function NewsletterForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // 실제 API 호출은 여기에 구현
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Newsletter subscription:", data);
    setIsSubmitted(true);
    reset();

    // 3초 후 성공 메시지 숨김
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="flex-1"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "구독 중..." : "구독하기"}
          </Button>
        </div>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
        {isSubmitted && (
          <p className="text-sm text-green-600 dark:text-green-400">
            ✓ 뉴스레터 구독이 완료되었습니다!
          </p>
        )}
      </div>
    </form>
  );
}
