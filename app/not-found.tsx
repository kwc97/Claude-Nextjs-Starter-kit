import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-8xl font-bold">404</h1>
          <h2 className="mt-4 text-2xl font-semibold">페이지를 찾을 수 없습니다</h2>
          <p className="mt-2 text-muted-foreground">
            요청하신 페이지가 존재하지 않습니다.
          </p>
          <Button className="mt-8" asChild>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
