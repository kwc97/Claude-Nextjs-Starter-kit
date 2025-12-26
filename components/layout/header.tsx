"use client";

import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Navigation } from "./navigation";
import { MobileNav } from "./mobile-nav";
import { Container } from "@/components/common/container";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <Navigation />
          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
