import { Github, Linkedin } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/sahilraut", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/sahil-raut-5478b5218/", icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Copyright */}
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">//</span> © {currentYear} Sahil Raut
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
