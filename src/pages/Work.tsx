import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";


export default function Work() {
  const headerCols = [
    { label: "IDX", className: "w-14 hidden md:flex" },
    { label: "Preview", className: "w-44 hidden md:flex" },
    { label: "Project", className: "flex-1" },
    { label: "Stack", className: "w-56 hidden lg:flex" },
    { label: "Impact", className: "w-64 hidden xl:flex" },
    { label: "", className: "w-8 hidden md:flex" },
  ];

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

          {/* Projects Table */}
          <div className="opacity-0 animate-fade-in-up stagger-2">
            {/* Header row */}
            <div className="hidden md:flex items-center gap-6 px-4 py-3 border border-border border-b-0 rounded-t-lg bg-card/60 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {headerCols.map((col) => (
                <div key={col.label} className={cn(col.className)}>
                  {col.label}
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="md:rounded-b-lg md:overflow-hidden border border-border md:border-t-0">
              {projects.map((project, index) => (
                <Link
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  className={cn(
                    "group flex flex-col md:grid md:grid-cols-[3.5rem_11rem_minmax(0,1.4fr)_minmax(0,0.9fr)_minmax(0,1fr)_2rem] md:items-center gap-4 md:gap-6 p-4 md:px-4 border-b border-border last:border-b-0 transition-colors hover:bg-primary/5",
                    `opacity-0 animate-fade-in-up stagger-${Math.min(index + 2, 4)}`
                  )}
                >
                  {/* IDX */}
                  <span className="hidden md:block font-mono text-sm text-primary">
                    /{String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Preview */}
                  <div className="overflow-hidden rounded border border-border bg-card md:aspect-video shrink-0">
                    {project.previewImage ? (
                      <img
                        src={project.previewImage}
                        alt={`${project.name} preview`}
                        loading="lazy"
                        width={1024}
                        height={768}
                        className="h-40 w-full object-cover md:h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center font-mono text-xs text-muted-foreground md:h-full">
                        [no preview]
                      </div>
                    )}
                  </div>

                  {/* Name + description */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="md:hidden font-mono text-xs text-primary">/{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="font-mono text-lg font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {project.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    {/* Mobile stack + impact */}
                    <div className="mt-3 flex flex-wrap gap-2 md:hidden">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="font-mono text-[10px] uppercase tracking-wider border border-border rounded px-2 py-0.5 text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 font-mono text-xs text-primary md:hidden">
                      <span className="text-muted-foreground">{"//"}</span> {project.impact}
                    </p>
                  </div>

                  {/* Stack (desktop) */}
                  <div className="hidden lg:flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="font-mono text-[10px] uppercase tracking-wider border border-border rounded px-2 py-0.5 text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="font-mono text-[10px] text-muted-foreground/70 px-1 py-0.5">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Impact (desktop) */}
                  <p className="hidden xl:block font-mono text-xs text-primary leading-relaxed line-clamp-3">
                    <span className="text-muted-foreground">{"//"}</span> {project.impact}
                  </p>

                  {/* Arrow */}
                  <ArrowRight className="hidden md:block h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all justify-self-end" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
