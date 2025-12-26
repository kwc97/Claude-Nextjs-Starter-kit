import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ExamplesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Section className="pt-32">
          <Container>
            <div className="flex flex-col items-center text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                컴포넌트 예제
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                스타터킷에 포함된 다양한 컴포넌트들의 사용 예제입니다
              </p>
            </div>

            <div className="space-y-16">
              {/* Buttons */}
              <div>
                <h2 className="text-2xl font-bold mb-6">버튼 (Buttons)</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Button 컴포넌트</CardTitle>
                    <CardDescription>
                      다양한 스타일과 크기의 버튼 예제
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                    <Separator />
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Badges */}
              <div>
                <h2 className="text-2xl font-bold mb-6">뱃지 (Badges)</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Badge 컴포넌트</CardTitle>
                    <CardDescription>
                      상태 표시나 라벨에 사용되는 뱃지
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Forms */}
              <div>
                <h2 className="text-2xl font-bold mb-6">폼 (Forms)</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Input 컴포넌트</CardTitle>
                    <CardDescription>
                      사용자 입력을 받는 폼 요소들
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="example-input">이메일</Label>
                      <Input
                        id="example-input"
                        type="email"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="example-password">비밀번호</Label>
                      <Input
                        id="example-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="example-disabled">비활성화된 입력</Label>
                      <Input
                        id="example-disabled"
                        type="text"
                        placeholder="Disabled"
                        disabled
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cards */}
              <div>
                <h2 className="text-2xl font-bold mb-6">카드 (Cards)</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>카드 제목</CardTitle>
                      <CardDescription>카드 설명 텍스트</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        카드 컨텐츠 영역입니다. 여기에 다양한 내용을 배치할 수 있습니다.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>통계 카드</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">12,345</div>
                      <p className="text-sm text-muted-foreground mt-2">
                        전월 대비 +20.1% 증가
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>뱃지 포함</CardTitle>
                        <Badge>New</Badge>
                      </div>
                      <CardDescription>
                        뱃지와 함께 사용하는 카드
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">자세히 보기</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <h2 className="text-2xl font-bold mb-6">컬러 팔레트</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>테마 색상</CardTitle>
                    <CardDescription>
                      다크모드와 라이트모드에서 자동으로 전환되는 색상
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2">
                        <div className="h-20 rounded-md bg-primary"></div>
                        <p className="text-sm font-medium">Primary</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-20 rounded-md bg-secondary"></div>
                        <p className="text-sm font-medium">Secondary</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-20 rounded-md bg-muted"></div>
                        <p className="text-sm font-medium">Muted</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-20 rounded-md bg-accent"></div>
                        <p className="text-sm font-medium">Accent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Typography */}
              <div>
                <h2 className="text-2xl font-bold mb-6">타이포그래피</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>텍스트 스타일</CardTitle>
                    <CardDescription>
                      다양한 크기와 스타일의 텍스트 예제
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h1 className="text-4xl font-bold">Heading 1</h1>
                    <h2 className="text-3xl font-bold">Heading 2</h2>
                    <h3 className="text-2xl font-bold">Heading 3</h3>
                    <h4 className="text-xl font-bold">Heading 4</h4>
                    <p className="text-lg">
                      Large paragraph text - 이것은 큰 단락 텍스트입니다.
                    </p>
                    <p className="text-base">
                      Default paragraph text - 기본 단락 텍스트입니다.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Small muted text - 작은 보조 텍스트입니다.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
