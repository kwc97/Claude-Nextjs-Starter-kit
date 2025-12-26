import { Zap, Smartphone, Moon, Code2, Palette, Search } from "lucide-react";
import { Feature } from "@/types";

export const features: Feature[] = [
  {
    icon: Zap,
    title: "빠른 성능",
    description: "Next.js 16의 최신 최적화 기술로 초고속 로딩 속도를 경험하세요.",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    description: "모든 디바이스에서 완벽하게 동작하는 반응형 레이아웃을 제공합니다.",
  },
  {
    icon: Moon,
    title: "다크모드 지원",
    description: "라이트와 다크 테마를 자유롭게 전환할 수 있습니다.",
  },
  {
    icon: Code2,
    title: "TypeScript",
    description: "타입 안전성을 보장하는 TypeScript로 개발되었습니다.",
  },
  {
    icon: Palette,
    title: "쉬운 커스터마이징",
    description: "Tailwind CSS를 활용하여 손쉽게 디자인을 변경할 수 있습니다.",
  },
  {
    icon: Search,
    title: "SEO 최적화",
    description: "검색 엔진 친화적인 구조로 더 나은 검색 순위를 얻으세요.",
  },
];
