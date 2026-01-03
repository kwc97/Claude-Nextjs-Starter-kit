"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationConfig } from "@/config/navigation";
import { ThemeToggle } from "@/components/common/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col space-y-4">
          {navigationConfig.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium transition-colors hover:text-foreground/80"
            >
              {item.title}
            </Link>
          ))}
          <div className="pt-4 border-t space-y-4">
            <div className="flex flex-col gap-2">
              <Button variant="outline" asChild onClick={() => setOpen(false)}>
                <Link href="/auth/login">로그인</Link>
              </Button>
              <Button asChild onClick={() => setOpen(false)}>
                <Link href="/auth/signup">회원가입</Link>
              </Button>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-medium">테마</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
