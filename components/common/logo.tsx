import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="text-xl font-bold">스타터킷</span>
    </Link>
  );
}
