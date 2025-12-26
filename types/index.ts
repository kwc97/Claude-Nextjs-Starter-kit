import { LucideIcon } from "lucide-react";

// 네비게이션 링크
export interface NavLink {
  title: string;
  href: string;
}

// 기능 카드
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

// 가격 플랜
export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

// Newsletter 폼 데이터
export interface NewsletterFormData {
  email: string;
}
