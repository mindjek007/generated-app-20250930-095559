import { Github, Twitter, UtensilsCrossed } from "lucide-react";
export function Footer() {
  return (
    <footer className="bg-muted/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-brand" />
            <span className="font-display text-lg font-semibold">
              Urban Chowk
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Urban Chowk. Built with ❤️ at Cloudflare.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}