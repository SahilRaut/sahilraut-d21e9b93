import { ReactNode, ComponentType } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download, Move3d, Box, Sigma, Brain, Eye, ScanSearch, Map as MapIcon, Radar, Hand, Gauge, Cpu, Users } from "lucide-react";
import {
  SiPython, SiCplusplus, SiRos, SiKubernetes, SiDocker, SiLinux, SiPytorch, SiTensorflow, SiNumpy,
  SiOpencv, SiNvidia, SiAutodesk, SiDassaultsystemes, SiKicad, SiArduino, SiRaspberrypi, SiGit,
} from "react-icons/si";
import { projects } from "@/data/projects";
import { BinaryGlitchText } from "@/components/ui/BinaryGlitchText";
import { BinaryField } from "@/components/lab/BinaryField";
import { AsciiRobotArm } from "@/components/lab/AsciiRobotArm";
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
    body: "Led the build of the CASTOR human-robot interaction humanoid: hardware assembly, face detection and ChatGPT-powered voice feedback.",
  },
  {
    meta: "Islington Robotica & SICK • Internships",
    title: "Robotics Intern",
    body: "Hands-on work across robot automation, sensors and industrial vision, shipping prototypes alongside engineering teams.",
  },
];

const skills: { name: string; Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>; color?: string }[] = [
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "C/C++", Icon: SiCplusplus, color: "#00599C" },
  { name: "ROS1/2", Icon: SiRos, color: "#9DB4D0" },
  { name: "MoveIt", Icon: Move3d, color: "#E8600A" },
  { name: "Gazebo", Icon: Box, color: "#F58113" },
  { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Linux", Icon: SiLinux, color: "#FCC624" },
  { name: "MATLAB", Icon: Sigma, color: "#E16737" },
  { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
  { name: "NumPy", Icon: SiNumpy, color: "#4DABCF" },
  { name: "Deep Learning", Icon: Brain, color: "#B45AF2" },
  { name: "OpenCV", Icon: SiOpencv, color: "#5C3EE8" },
  { name: "Computer Vision", Icon: Eye, color: "#38BDF8" },
  { name: "YOLOv8", Icon: ScanSearch, color: "#8A9BFF" },
  { name: "Visual SLAM", Icon: MapIcon, color: "#34D399" },
  { name: "LiDAR", Icon: Radar, color: "#F43F5E" },
  { name: "NVIDIA / CUDA", Icon: SiNvidia, color: "#76B900" },
  { name: "Manipulation", Icon: Hand, color: "#FBBF24" },
  { name: "Robot Control", Icon: Gauge, color: "#22D3EE" },
  { name: "Fusion360", Icon: SiAutodesk, color: "#0696D7" },
  { name: "SolidWorks", Icon: SiDassaultsystemes, color: "#E11D48" },
  { name: "PCB / KiCad", Icon: SiKicad, color: "#314CB0" },
  { name: "VHDL", Icon: Cpu, color: "#A78BFA" },
  { name: "Arduino", Icon: SiArduino, color: "#00878F" },
  { name: "Raspberry Pi", Icon: SiRaspberrypi, color: "#A22846" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Leadership", Icon: Users, color: "#F97316" },
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
            <a
              href="/cv/Sahil-Raut-CV.pdf"
              download
              aria-label="Download CV"
              className="inline-flex items-center gap-2"
            >
              <Download className="h-4 w-4 shrink-0 text-primary md:h-3.5 md:w-3.5" />
              <span className="retro-text hidden text-xs md:inline md:text-sm">Download CV</span>
            </a>
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

        <Section index="03" title="Projects" id="projects">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              className="group block overflow-hidden rounded-lg border border-border bg-card/60 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-card/80 hover:shadow-[0_0_45px_-8px_hsl(var(--primary)/0.45)]"
            >
              {p.previewImage && (
                <div className="aspect-video overflow-hidden border-b border-border bg-card">
                  <img src={p.previewImage} alt={`${p.name} preview`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105" />
                </div>
              )}
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
            {skills.map(({ name, Icon, color }) => (
              <div
                key={name}
                title={name}
                className="group flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-[0_0_14px_hsl(var(--primary)/0.3)]"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                <span className="font-mono text-[11px] leading-none text-muted-foreground group-hover:text-foreground">{name}</span>
              </div>
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
              <div>
                <a
                  href="/cv/Sahil-Raut-CV.pdf"
                  download
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-primary transition-colors hover:bg-primary/10"
                >
                  <Download className="h-3 w-3" />
                  Download CV
                </a>
              </div>
            </div>
            <AsciiRobotArm className="pointer-events-none order-last ml-auto h-[28vh] w-full max-w-[300px] md:order-none md:ml-0 md:h-[40vh] md:max-w-[30vw] md:shrink-0 opacity-90" />
          </div>
        </section>

        <footer className="relative z-10 pb-8 text-xs text-muted-foreground">© {new Date().getFullYear()} Sahil Raut</footer>
      </main>
    </div>
  );
}
