import { ReactNode, ComponentType } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download, Github, Linkedin, Youtube, Move3d, Box, Sigma, Brain, Eye, ScanSearch, Map as MapIcon, Radar, Hand, Gauge, Cpu, Users, Grab, Route, RadioTower, Cable, Activity, Blocks, Wrench, Network, ClipboardList, MessageSquare, GraduationCap, Handshake } from "lucide-react";
import {
  SiPython, SiCplusplus, SiRos, SiKubernetes, SiDocker, SiLinux, SiPytorch, SiTensorflow, SiNumpy,
  SiOpencv, SiNvidia, SiAutodesk, SiDassaultsystemes, SiKicad, SiArduino, SiRaspberrypi, SiGit,
} from "react-icons/si";
import { projects } from "@/data/projects";
import { BinaryGlitchText } from "@/components/ui/BinaryGlitchText";
import { BinaryField } from "@/components/lab/BinaryField";
import { AsciiRobotArm } from "@/components/lab/AsciiRobotArm";
import sahilLogo from "@/assets/sahil-logo-original-white.png";
import neuraLogo from "@/assets/logo-neura.svg";
import sickLogo from "@/assets/logo-sick.svg";
import uweLogo from "@/assets/logo-uwe.svg";
import brlLogo from "@/assets/logo-brl.png";
import islingtonLogo from "@/assets/logo-islington-robotica.png";

const socials = [
  { label: "GitHub", href: "https://github.com/SahilRaut", Icon: Github, color: "#F0F6FC" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sahil-raut-5478b5218/", Icon: Linkedin, color: "#70B5F9" },
  { label: "YouTube", href: "https://www.youtube.com/@HiSahilTech", Icon: Youtube, color: "#FF3B30" },
];

type CompanyLogo = { src: string; alt: string; wide?: boolean };

const experience: { logos: CompanyLogo[]; meta: string; title: string; body: string }[] = [
  {
    logos: [{ src: neuraLogo, alt: "NEURA Robotics logo", wide: true }],
    meta: "NEURA Robotics • Riederich, Germany • 2025–Present",
    title: "AI Robotics Software Developer",
    body: "Training and integrating deep learning models, including grasp-generation engines, into production robots. Connecting robots to the Neuraverse cloud platform and deploying custom applications for real customers.",
  },
  {
    logos: [{ src: uweLogo, alt: "UWE Bristol logo" }],
    meta: "UWE-AI • Bristol, UK • 2024–2025",
    title: "Perception Engineer",
    body: "Built LiDAR perception for the team's autonomous formula car: detection, clustering and tracking of track cones feeding the planning stack.",
  },
  {
    logos: [{ src: brlLogo, alt: "Bristol Robotics Laboratory logo", wide: true }],
    meta: "Bristol Robotics Laboratory • Bristol, UK • 2024–2025",
    title: "Robotics Engineer Intern",
    body: "Led the build of the CASTOR human-robot interaction humanoid: hardware assembly, face detection and ChatGPT-powered voice feedback.",
  },
  {
    logos: [
      { src: islingtonLogo, alt: "Islington Robotica logo" },
      { src: sickLogo, alt: "SICK logo" },
    ],
    meta: "Islington Robotica & SICK • Internships",
    title: "Robotics Intern",
    body: "Hands-on work across robot automation, sensors and industrial vision, shipping prototypes alongside engineering teams.",
  },
];

type Skill = { name: string; Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>; color?: string };
const skills: Skill[] = [
  // AI & Perception
  { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
  { name: "NumPy", Icon: SiNumpy, color: "#4DABCF" },
  { name: "OpenCV", Icon: SiOpencv, color: "#5C3EE8" },
  { name: "Computer Vision", Icon: Eye, color: "#38BDF8" },
  { name: "Deep Learning", Icon: Brain, color: "#B45AF2" },
  { name: "YOLOv8", Icon: ScanSearch, color: "#8A9BFF" },
  { name: "NVIDIA CUDA", Icon: SiNvidia, color: "#76B900" },
  // Robotics & Autonomy
  { name: "ROS 1 / ROS 2", Icon: SiRos, color: "#7C9CF5" },
  { name: "Robot Manipulation", Icon: Hand, color: "#FBBF24" },
  { name: "Grasp Generation", Icon: Grab, color: "#F97316" },
  { name: "Robot Control", Icon: Gauge, color: "#22D3EE" },
  { name: "Motion Planning", Icon: Route, color: "#60A5FA" },
  { name: "Visual SLAM", Icon: MapIcon, color: "#34D399" },
  { name: "LiDAR", Icon: Radar, color: "#F43F5E" },
  { name: "Sensor Integration", Icon: RadioTower, color: "#2DD4BF" },
  { name: "MoveIt", Icon: Move3d, color: "#E8600A" },
  { name: "Gazebo", Icon: Box, color: "#F58113" },
  // Hardware & Embedded Systems
  { name: "NVIDIA Jetson", Icon: SiNvidia, color: "#76B900" },
  { name: "Raspberry Pi", Icon: SiRaspberrypi, color: "#A22846" },
  { name: "Arduino", Icon: SiArduino, color: "#00878F" },
  { name: "PCB Design", Icon: SiKicad, color: "#314CB0" },
  { name: "Electronics Debugging", Icon: Activity, color: "#FACC15" },
  { name: "3D CAD", Icon: Blocks, color: "#E879F9" },
  { name: "Prototyping", Icon: Wrench, color: "#94A3B8" },
  { name: "VHDL", Icon: Cpu, color: "#A78BFA" },
  { name: "Altera FPGA", Icon: Cpu, color: "#0068B5" },
  { name: "ESP32", Icon: SiEspressif, color: "#E7352C" },
  // Tools
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: Github, color: "#F0F6FC" },
  { name: "MATLAB", Icon: Sigma, color: "#E16737" },
  { name: "Fusion 360", Icon: SiAutodesk, color: "#0696D7" },
  { name: "SolidWorks", Icon: SiDassaultsystemes, color: "#E11D48" },
  { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Linux", Icon: SiLinux, color: "#FCC624" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "C/C++", Icon: SiCplusplus, color: "#00599C" },
  // Team
  { name: "Technical Leadership", Icon: Users, color: "#F97316" },
  { name: "Cross-Functional Collaboration", Icon: Network, color: "#22D3EE" },
  { name: "Project Coordination", Icon: ClipboardList, color: "#34D399" },
  { name: "Communication", Icon: MessageSquare, color: "#60A5FA" },
  { name: "Mentoring", Icon: GraduationCap, color: "#FBBF24" },
  { name: "Stakeholder Engagement", Icon: Handshake, color: "#F472B6" },
];

const skillGroups: { label: string; names: string[] }[] = [
  {
    label: "AI & Perception",
    names: ["PyTorch", "TensorFlow", "NumPy", "OpenCV", "Computer Vision", "Deep Learning", "YOLOv8", "NVIDIA CUDA"],
  },
  {
    label: "Robotics & Autonomy",
    names: ["ROS 1 / ROS 2", "Robot Manipulation", "Grasp Generation", "Robot Control", "Motion Planning", "Visual SLAM", "LiDAR", "Sensor Integration", "MoveIt", "Gazebo"],
  },
  {
    label: "Hardware & Embedded Systems",
    names: ["NVIDIA Jetson", "Raspberry Pi", "Arduino", "PCB Design", "Electronics Debugging", "3D CAD", "Prototyping", "VHDL", "Altera FPGA", "ESP32"],
  },
  {
    label: "Tools",
    names: ["Git", "GitHub", "MATLAB", "Fusion 360", "SolidWorks", "Kubernetes", "Docker", "Linux", "Python", "C/C++"],
  },
  {
    label: "Team",
    names: ["Technical Leadership", "Cross-Functional Collaboration", "Project Coordination", "Communication", "Mentoring", "Stakeholder Engagement"],
  },
];

function Section({ index, title, children, id }: { index: string; title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="grid scroll-mt-20 gap-6 border-t border-border py-12 md:grid-cols-2 md:gap-8 md:py-24">
      <h2 className="font-display text-xl uppercase tracking-tight min-w-0 md:sticky md:top-24 md:self-start">
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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <a href="#top" aria-label="Sahil Raut home" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center md:h-9 md:w-9">
              <img
                src={sahilLogo}
                alt=""
                className="h-full w-full object-contain drop-shadow-[0_0_6px_hsl(var(--primary)/0.35)] transition-[filter] duration-300 group-hover:drop-shadow-[0_0_12px_hsl(var(--primary)/0.7)]"
              />
            </span>
          </a>
          <nav className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider md:gap-7 md:text-xs">
            <a href="#projects" className="hidden text-muted-foreground transition-colors hover:text-primary sm:inline">Projects</a>
            <a href="#skills" className="hidden text-muted-foreground transition-colors hover:text-primary sm:inline">Skills</a>
            <a href="https://github.com/SahilRaut" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary">
              <Github className="h-4 w-4" /><span className="hidden md:inline">GitHub</span>
            </a>
            <a href="/cv/Sahil-Raut-CV.pdf" download aria-label="Download CV" className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary">
              <Download className="h-4 w-4 md:h-3.5 md:w-3.5" /><span className="hidden md:inline">CV</span>
            </a>
            <Link to="/contact" className="rounded-full border border-primary/50 px-3 py-1.5 text-primary transition-colors hover:bg-primary/10">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative z-10 flex min-h-screen items-end overflow-hidden pb-10 pt-24">
        <div className="container absolute inset-x-0 top-20 flex justify-end md:top-24">
          <p className="max-w-[200px] text-right text-[10px] font-semibold uppercase leading-relaxed tracking-wide md:max-w-xs md:text-xs">
            “ I build robots for the benefit of humankind. ”
          </p>
        </div>
        <div className="container relative">
          {/* nudge right so the "A" lines up with the S glyph of SAHIL (S side-bearing ≈ 0.043 × h1 size) */}
          <p className="ml-[0.56vw] font-display text-base leading-tight text-primary md:ml-[0.39vw] md:text-2xl">
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
          <div className="space-y-5">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              I am a robotics engineer working across perception, learning, planning, control and embedded hardware. I build and integrate systems that help robots understand their environment, make decisions and act reliably; from vision and data pipelines to manipulation systems.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              I am interested in embodied AI, autonomous systems and human-robot interaction. Outside work, you will find me following Formula 1, playing football or chess, and contributing to open-source robotics projects.
            </p>
          </div>
        </Section>

        <Section index="02" title="Experience">
          {experience.map((e) => (
            <div key={e.title + e.meta} className="group flex gap-4">
              <div className="flex h-9 shrink-0 items-center gap-2.5">
                {e.logos.map((l) => (
                  <img
                    key={l.alt}
                    src={l.src}
                    alt={l.alt}
                    loading="lazy"
                    className={
                      l.wide
                        ? "h-7 w-auto max-w-[120px] object-contain"
                        : "h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105"
                    }
                  />
                ))}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{e.meta}</p>
                <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-primary md:text-xl">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
              </div>
            </div>
          ))}
        </Section>

        <Section index="03" title="Projects" id="projects">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="group overflow-hidden rounded-lg border border-border bg-card/70 backdrop-blur-md transition-all duration-300 hover:border-primary/60"
            >
              <Link to={`/work/${p.slug}`} className="block">
                {p.previewImage && (
                  <div className="aspect-video overflow-hidden border-b border-border bg-card">
                    <img src={p.previewImage} alt={`${p.name} preview`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105" />
                  </div>
                )}
                <div className="flex items-start justify-between gap-4 px-6 pt-5">
                  <h3 className="min-w-0 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">{p.name}</h3>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-3 px-6 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5 px-6">
                  {p.stack.slice(0, 4).map((t) => (
                    <span key={t} className="rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t}</span>
                  ))}
                </div>
              </Link>
              <div className="mt-5 flex gap-2 border-t border-border px-6 py-4">
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary">
                    <Github className="h-3.5 w-3.5" style={{ color: "#F0F6FC" }} /> Code
                  </a>
                )}
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary">
                    <Youtube className="h-3.5 w-3.5" style={{ color: "#FF3B30" }} />
                    Demo
                  </a>
                )}
                <Link to={`/work/${p.slug}`} className="ml-auto inline-flex items-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-primary">Details</Link>
              </div>
            </article>
          ))}
        </Section>

        <Section index="04" title="Skills" id="skills">
          {skillGroups.map((g) => (
            <div key={g.label}>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">// {g.label}</p>
              <div className="flex flex-wrap gap-2">
                {skills.filter((s) => g.names.includes(s.name)).map(({ name, Icon, color }) => (
                  <div key={name} className="flex items-center gap-2 rounded-md border border-border bg-card/70 px-3 py-1.5 transition-colors hover:border-primary/60">
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                    <span className="font-mono text-[11px] uppercase leading-none tracking-wider text-foreground/85">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Section>

        <Section index="05" title="Education">
          <div>
            <h3 className="text-xl font-semibold">BEng (Hons) Robotics</h3>
            <p className="mt-2 text-sm text-muted-foreground">University of the West of England, Bristol</p>
            <p className="mt-1 text-sm font-medium text-primary">First Class Honours</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Focused on robotics systems, AI, control and embedded engineering. Represented students during my degree and competed at the SICK Solution Hackathon 2023 in Germany.
            </p>
          </div>
        </Section>

        <section className="relative overflow-hidden border-t border-border pt-12 pb-4 md:pt-16 md:pb-6">
          <div className="relative z-10 flex flex-col items-start gap-10 md:flex-row md:items-start md:justify-between md:gap-6">
            <div className="min-w-0">
              <h2 className="retro-text font-display text-[7vw] uppercase leading-[0.9] tracking-tighter md:text-[4.5vw]">
                Thanks
                <br />
                for being
                <br />
                here
              </h2>
              <Link to="/contact" className="mt-5 inline-block font-display text-base leading-tight text-primary hover:opacity-80 md:mt-6 md:text-xl">
                Solving robotics,
                <br />
                one inference layer at a time
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 transition-colors hover:border-primary/60"
                  >
                    <s.Icon className="h-4 w-4" style={{ color: s.color }} />
                  </a>
                ))}
              </div>
            </div>
            <AsciiRobotArm className="pointer-events-none order-last ml-auto h-[28vh] w-full max-w-[300px] md:order-none md:ml-0 md:h-[40vh] md:max-w-[30vw] md:shrink-0 opacity-90" />
          </div>
        </section>

      </main>
    </div>
  );
}
