import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
