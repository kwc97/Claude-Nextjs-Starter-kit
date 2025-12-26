"use client";

import Link from "next/link";
import { navigationConfig } from "@/config/navigation";

export function Navigation() {
  return (
    <nav className="hidden items-center space-x-6 md:flex">
      {navigationConfig.main.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
