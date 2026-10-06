import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";


export default function Work() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          {/* Page Header */}
          <div className="max-w-2xl mb-12 opacity-0 animate-fade-in-up">
            <h1 className="retro-text font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mb-6 pr-2">
              Projects
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              A selection of robotics projects spanning perception, human-robot interaction, embedded hardware and autonomous systems.
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-1">
            <CodeDivider label="Projects" />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                to={`/work/${project.slug}`}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-lg border border-border bg-card/60 transition-colors hover:border-primary/60 hover:bg-primary/5",
                  `opacity-0 animate-fade-in-up stagger-${Math.min(index + 2, 4)}`
                )}
              >
                {/* Preview */}
                <div className="relative aspect-video overflow-hidden border-b border-border bg-card">
                  {project.previewImage ? (
                    <img
                      src={project.previewImage}
                      alt={`${project.name} preview`}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
                      [no preview]
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded border border-border bg-background/80 px-2 py-0.5 font-mono text-xs text-primary backdrop-blur-sm">
                    /{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-mono text-lg font-medium text-foreground transition-colors group-hover:text-primary">
                      {project.name}
                    </h3>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Stack */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-1 py-0.5 font-mono text-[10px] text-muted-foreground/70">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Impact */}
                  <p className="mt-auto pt-4 font-mono text-xs leading-relaxed text-primary line-clamp-2">
                    <span className="text-muted-foreground">{"//"}</span> {project.impact}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
