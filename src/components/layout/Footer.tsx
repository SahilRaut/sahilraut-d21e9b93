import { Github, Linkedin, Youtube, Download } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/SahilRaut", Icon: Github, color: "#F0F6FC" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sahil-raut-5478b5218/", Icon: Linkedin, color: "#70B5F9" },
  { label: "YouTube", href: "https://youtu.be/qhjFYePOsr8", Icon: Youtube, color: "#FF3B30" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="container flex flex-wrap items-center justify-between gap-4 py-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          © {new Date().getFullYear()} Sahil Raut
        </p>
        <div className="flex items-center gap-2">
          <a
            href="/cv/Sahil-Raut-CV.pdf"
            download
            aria-label="Download CV"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <Download className="h-3 w-3" /> CV
          </a>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:border-primary/60"
            >
              <s.Icon className="h-3.5 w-3.5" style={{ color: s.color }} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
