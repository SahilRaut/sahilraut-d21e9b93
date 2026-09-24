import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { TechTag } from "@/components/ui/TechTag";

const skills = [
  "AI Robotic Manipulation",
  "Computer & Machine Vision",
  "Visual SLAM & LiDAR",
  "Robot Control Systems",
  "Electronics & PCB Prototyping",
  "Team Leadership",
];

const stack = [
  "Python", "C/C++", "ROS1/2", "MoveIt", "Gazebo", "Kubernetes",
  "MATLAB", "Fusion360", "SolidWorks", "Git", "VHDL", "Arduino",
];

export default function About() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          {/* Page Header */}
          <div className="max-w-3xl mb-12 opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About
            </h1>
          </div>

          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Developer Photo */}
              <div className="mb-8 opacity-0 animate-fade-in-up stagger-1">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-primary/30 transition-all duration-300 hover:border-primary">
                  <img
                    src="https://api.dicebear.com/9.x/initials/svg?seed=Sahil%20Raut"
                    alt="Sahil Raut"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-1">
                <p className="text-lg text-foreground leading-relaxed">
                  I'm <span className="text-primary font-medium">Sahil Raut</span>, an AI Robotics Software Developer at NEURA Robotics in Riederich, Germany. I build the intelligence behind autonomous robotic manipulation, deploying AI that lets robots learn and adapt to novel tasks end to end.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-2">
                <p className="text-muted-foreground leading-relaxed">
                  I train and integrate deep learning models, including grasp-generation engines, into production robots, connect them to the Neuraverse cloud platform, and deploy custom applications for real customers. Before NEURA I worked on LiDAR perception for UWE-AI's autonomous formula car, led the CASTOR humanoid project at Bristol Robotics Laboratory, and interned at Islington Robotica and SICK.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-3">
                <p className="text-muted-foreground leading-relaxed">
                  I hold a BEng (Hons) in Robotics from the University of the West of England, where I competed at the SICK Solution Hackathon 2023 in Germany and served as a student rep. Outside work: Formula 1, football, chess, music, cinematography and content creation.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-4">
                <CodeDivider label="Philosophy" />
              </div>

              <div className="space-y-4 font-mono text-sm opacity-0 animate-fade-in-up stagger-4">
                <p className="text-muted-foreground transition-colors hover:text-foreground">
                  <span className="text-primary">{"//"}</span> Bridge research and real hardware
                </p>
                <p className="text-muted-foreground transition-colors hover:text-foreground">
                  <span className="text-primary">{"//"}</span> Robots should learn, not just follow
                </p>
                <p className="text-muted-foreground transition-colors hover:text-foreground">
                  <span className="text-primary">{"//"}</span> Precision in the real world beats demos
                </p>
                <p className="text-muted-foreground transition-colors hover:text-foreground">
                  <span className="text-primary">{"//"}</span> Build across hardware, software and people
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Skills */}
              <div className="opacity-0 animate-fade-in-up stagger-2">
                <h2 className="font-mono text-sm text-primary mb-4">
                  <span className="text-muted-foreground">/*</span> Skills <span className="text-muted-foreground">*/</span>
                </h2>
                <ul className="space-y-2">
                  {skills.map((skill) => (
                    <li key={skill} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      <span className="text-primary mr-2">→</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="opacity-0 animate-fade-in-up stagger-3">
                <h2 className="font-mono text-sm text-primary mb-4">
                  <span className="text-muted-foreground">/*</span> Stack <span className="text-muted-foreground">*/</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="opacity-0 animate-fade-in-up stagger-4">
                <h2 className="font-mono text-sm text-primary mb-4">
                  <span className="text-muted-foreground">/*</span> Experience <span className="text-muted-foreground">*/</span>
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>NEURA Robotics — AI Robotics Software Dev (2025–now)</p>
                  <p>UWE-AI — Perception Engineer (2024–25)</p>
                  <p>Bristol Robotics Lab — Robotics Engineer Intern (2024–25)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
