import { Container } from "@/components/common/container";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t py-8">
      <Container>
        <Separator className="mb-8" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            {siteConfig.links.github && (
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
            )}
            {siteConfig.links.twitter && (
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
