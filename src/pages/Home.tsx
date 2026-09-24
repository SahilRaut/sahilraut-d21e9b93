import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { BinaryGlitchText } from "@/components/ui/BinaryGlitchText";
import { BinaryField } from "@/components/lab/BinaryField";
import sahilLogo from "@/assets/sahil-logo-original-white.png";

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

function Section({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-border py-12 md:grid-cols-2 md:gap-8 md:py-24">
      <h2 className="retro-text font-display text-xl pr-1 uppercase tracking-tight min-w-0 md:sticky md:top-24 md:self-start md:text-2xl">
        <span className="text-primary">{index}.</span> {title}
      </h2>
      <div className="min-w-0 space-y-8 md:space-y-12">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <BinaryField />
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <a href="#top" aria-label="Sahil Raut — home" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center md:h-9 md:w-9">
              <img
                src={sahilLogo}
                alt=""
                className="h-full w-full object-contain drop-shadow-[0_0_6px_hsl(var(--primary)/0.35)] transition-[filter] duration-300 group-hover:drop-shadow-[0_0_12px_hsl(var(--primary)/0.7)]"
              />
            </span>
          </a>
          <nav className="flex items-center gap-5 md:gap-8">
            <Link to="/work" className="inline-block">
              <span className="retro-text text-xs md:text-sm">Projects</span>
            </Link>
            <Link to="/contact" className="inline-block">
              <span className="retro-text text-xs md:text-sm">Contact me</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative z-10 flex min-h-screen items-end overflow-hidden pb-10 pt-24">
        <div className="container absolute inset-x-0 top-20 flex justify-end md:top-24">
          <p className="max-w-[200px] text-right text-[10px] font-semibold uppercase leading-relaxed tracking-wide md:max-w-xs md:text-xs">
            “ Robots shouldn't just follow instructions — they should learn, adapt and act precisely in the real world. ”
          </p>
        </div>
        <div className="container relative">
          <p className="font-display text-base leading-tight text-primary md:text-2xl">
            AI × Robotics
          </p>
          <h1 className="font-display text-[13vw] uppercase leading-[0.85] tracking-tighter md:text-[9vw]">
            <BinaryGlitchText text="Sahil" speed={30} hold={2} />
            <br />
            <BinaryGlitchText text="Raut" speed={30} hold={2} delay={400} />
          </h1>
        </div>
      </section>

      <main className="container relative z-10">
        <Section index="01" title="About">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            I'm an AI robotics software developer at <span className="text-foreground">NEURA Robotics</span>, bridging deep learning research and physical hardware so robots can learn and adapt to novel tasks end to end. BEng (Hons) Robotics, UWE Bristol. Outside work: Formula 1, football, chess and cinematography.
          </p>
        </Section>

        <Section index="02" title="Experience">
          {experience.map((e) => (
            <div key={e.title + e.meta} className="group">
              <p className="text-xs text-muted-foreground">{e.meta}</p>
              <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-primary md:text-xl">{e.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
            </div>
          ))}
        </Section>

        <Section index="03" title="Projects">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              className="group block rounded-lg border border-border bg-card/60 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-card/80 hover:shadow-[0_0_45px_-8px_hsl(var(--primary)/0.45)]"
            >
              <div className="flex items-start justify-between gap-4 px-6 pt-5">
                <h3 className="min-w-0 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  <BinaryGlitchText text={p.name} speed={25} hold={2} />
                </h3>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-foreground/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-3 px-6 pb-5 text-sm leading-relaxed text-foreground/80">{p.description}</p>
            </Link>
          ))}
        </Section>

        <Section index="04" title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-foreground/90 backdrop-blur-md transition-colors hover:border-primary/60 hover:bg-card/80 hover:text-foreground">
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

        <section className="border-t border-border py-16 md:py-24">
          <h2 className="retro-text font-display text-[11vw] uppercase leading-[0.85] tracking-tighter md:text-[8vw]">
            Thanks
            <br />
            for being
            <br />
            here
          </h2>
          <Link to="/contact" className="mt-6 inline-block font-display text-lg leading-tight text-primary hover:opacity-80 md:mt-8 md:text-2xl">
            Solving robotics,
            <br />
            one inference layer at a time
          </Link>
        </section>

        <footer className="relative z-10 pb-8 text-xs text-muted-foreground">© {new Date().getFullYear()} Sahil Raut</footer>
      </main>
    </div>
  );
}
