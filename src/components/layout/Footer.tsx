import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const links = [
  { href: "https://github.com/SahilRaut", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/sahil-raut-5478b5218/", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:hisahiltech@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background/80 backdrop-blur-md">
      <div className="container grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-sm uppercase tracking-tight">Sahil Raut</p>
          <p className="mt-2 text-sm text-muted-foreground">Robotics and perception engineer. AI, manipulation and embedded systems.</p>
        </div>
        <nav className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <a href="/#projects" className="hover:text-primary">Projects</a>
          <a href="/#skills" className="hover:text-primary">Skills</a>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
          <a href="/cv/Sahil-Raut-CV.pdf" download className="inline-flex items-center gap-1.5 hover:text-primary"><Download className="h-3 w-3" />CV</a>
        </nav>
        <div className="flex items-start gap-3 md:justify-end">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={l.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <l.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="container border-t border-border py-4 font-mono text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} Sahil Raut. All rights reserved.
      </div>
    </footer>
  );
}
