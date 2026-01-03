"use client";

import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Navigation } from "./navigation";
import { MobileNav } from "./mobile-nav";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <Navigation />
          <div className="flex items-center gap-2">
            <div className="hidden md:flex md:items-center md:gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">로그인</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">회원가입</Link>
              </Button>
            </div>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
