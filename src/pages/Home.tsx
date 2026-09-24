import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { BinaryGlitchText } from "@/components/ui/BinaryGlitchText";
import { NeuralField } from "@/components/lab/NeuralField";

const experience = [
  {
    meta: "NEURA Robotics • Riederich, Germany • 2025–Present",
    title: "AI Robotics Software Developer",
    body: "Training and integrating deep learning models, including grasp-generation engines, into production robots. Connecting robots to the Neuraverse cloud platform and deploying custom applications for real customers.",
  },
  {
    meta: "UWE-AI • Bristol, UK • 2024–2025",
    title: "Perception Engineer",
    body: "Built LiDAR perception for the team's autonomous formula car — detection, clustering and tracking of track cones feeding the planning stack.",
  },
  {
    meta: "Bristol Robotics Laboratory • Bristol, UK • 2024–2025",
    title: "Robotics Engineer Intern",
    body: "Led the replication of the CASTOR human-robot interaction humanoid: hardware assembly, face detection and ChatGPT-powered voice feedback.",
  },
  {
    meta: "Islington Robotica & SICK • Internships",
    title: "Robotics Intern",
    body: "Hands-on work across robot automation, sensors and industrial vision, shipping prototypes alongside engineering teams.",
  },
];

const skills = [
  "Python", "C/C++", "ROS1/2", "MoveIt", "Gazebo", "Kubernetes", "MATLAB",
  "Deep Learning", "Robotic Manipulation", "Computer Vision", "Visual SLAM",
  "LiDAR", "Robot Control", "YOLOv8", "Fusion360", "SolidWorks", "PCB Prototyping",
  "VHDL", "Arduino", "Git", "Team Leadership",
];

const contact = [
  { label: "Email", value: "hello@sahilraut.dev", href: "mailto:hello@sahilraut.dev" },
  { label: "LinkedIn", value: "in/sahil-raut", href: "https://www.linkedin.com/in/sahil-raut-5478b5218/" },
  { label: "GitHub", value: "github.com/sahilraut", href: "https://github.com/sahilraut" },
];

function Section({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-border py-16 md:grid-cols-2 md:py-24">
      <h2 className="font-display text-xl uppercase tracking-tight md:sticky md:top-24 md:self-start">
        <span className="text-primary">{index}.</span> {title}
      </h2>
      <div className="space-y-12">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-3">
            <span>Sahil Raut</span>
            <span className="flex items-center gap-1.5 text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Available for work
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/work" className="hover:text-primary transition-colors">Work</Link>
            <a href="#contact" className="hover:text-primary transition-colors">Contact me</a>
            <span className="hidden text-muted-foreground sm:inline">(UTC+1)</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden pb-16 pt-24">
        <NeuralField className="pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="container relative">
          <p className="mb-16 ml-auto max-w-xs text-right text-xs font-semibold uppercase leading-relaxed tracking-wide md:mb-32">
            “ Robots shouldn't just follow instructions — they should learn, adapt and act precisely in the real world. ”
          </p>
          <p className="font-display text-lg leading-tight text-primary md:text-2xl">
            2022→2026
            <br />
            AI × Robotics
          </p>
          <h1 className="font-display text-[15vw] uppercase leading-[0.85] tracking-tighter md:text-[9vw]">
            <BinaryGlitchText text="Sahil" speed={30} hold={2} />
            <br />
            <BinaryGlitchText text="Raut" speed={30} hold={2} delay={400} />
          </h1>
          <div className="mt-6 flex items-end justify-between text-xs font-medium">
            <span>AI Robotics Software Developer, based in Germany</span>
            <span className="text-muted-foreground">Scroll ↓</span>
          </div>
        </div>
      </section>

      <main className="container">
        <Section index="01" title="About">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm an AI robotics software developer at <span className="text-foreground">NEURA Robotics</span>, bridging deep learning research and physical hardware so robots can learn and adapt to novel tasks end to end. BEng (Hons) Robotics, UWE Bristol. Outside work: Formula 1, football, chess and cinematography.
          </p>
        </Section>

        <Section index="02" title="Experience">
          {experience.map((e) => (
            <div key={e.title + e.meta} className="group">
              <p className="text-xs text-muted-foreground">{e.meta}</p>
              <h3 className="mt-2 text-xl font-semibold transition-colors group-hover:text-primary">{e.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
            </div>
          ))}
        </Section>

        <Section index="03" title="Projects">
          {projects.map((p) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="group block rounded-lg border border-border p-5 transition-colors hover:border-primary">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{p.name}</h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            </Link>
          ))}
        </Section>

        <Section index="04" title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section index="05" title="Education">
          <div>
            <p className="text-xs text-muted-foreground">University of the West of England • Bristol</p>
            <h3 className="mt-2 text-xl font-semibold">BEng (Hons) Robotics</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Competed at the SICK Solution Hackathon 2023 in Germany and served as a student representative.
            </p>
          </div>
        </Section>

        <div id="contact">
          <Section index="06" title="Contact">
            {contact.map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="group block">
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className="mt-1 text-lg font-semibold transition-colors group-hover:text-primary">{c.value}</p>
              </a>
            ))}
          </Section>
        </div>

        <section className="border-t border-border py-24">
          <h2 className="font-display text-[13vw] uppercase leading-[0.85] tracking-tighter text-muted-foreground md:text-[8vw]">
            Thanks
            <br />
            for being
            <br />
            here
          </h2>
          <a href="#contact" className="mt-8 inline-block font-display text-2xl leading-tight text-primary hover:opacity-80">
            Let's build
            <br />
            robots that learn
          </a>
        </section>

        <footer className="pb-8 text-xs text-muted-foreground">© {new Date().getFullYear()} Sahil Raut</footer>
      </main>
    </div>
  );
}
