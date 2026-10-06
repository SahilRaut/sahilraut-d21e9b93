import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { TechTag } from "@/components/ui/TechTag";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { projectsBySlug as projectsData } from "@/data/projects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData[slug] : null;

  if (!project) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container">
            <div className="text-center">
              <h1 className="retro-text font-display text-5xl uppercase tracking-tighter mb-6 pr-2">Project Not Found</h1>
              <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
              <Button asChild>
                <Link to="/work">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container max-w-4xl">
          {/* Back Link */}
          <Link 
            to="/work" 
            className="inline-flex items-center font-mono text-sm text-muted-foreground hover:text-primary transition-colors mb-8 opacity-0 animate-fade-in-up"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="mb-12 opacity-0 animate-fade-in-up stagger-1">
            <h1 className="retro-text font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mb-6 pr-2">
              {project.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {project.fullDescription}
            </p>

            {/* Intro photo — how the project looked at the start */}
            {project.introImage && (
              <figure className="mb-6 overflow-hidden rounded-lg border border-border bg-card">
                <img
                  src={project.introImage}
                  alt={`${project.name} — setup at the beginning`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {project.introImageCaption && (
                  <figcaption className="px-4 py-3 font-mono text-xs text-muted-foreground border-t border-border">
                    <span className="text-primary">{"//"}</span> {project.introImageCaption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Additional project photos — side by side when there are two */}
            {project.gallery && project.gallery.length > 0 && (
              <div className={cn("mb-6 gap-6", project.gallery.length > 1 ? "grid sm:grid-cols-2" : "grid")}>
                {project.gallery.map((photo, i) => (
                  <figure
                    key={i}
                    className="overflow-hidden rounded-lg border border-border bg-card flex flex-col"
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption || `${project.name} — photo ${i + 2}`}
                      className="w-full h-56 sm:h-64 object-cover"
                      loading="lazy"
                    />
                    {photo.caption && (
                      <figcaption className="px-4 py-3 font-mono text-xs text-muted-foreground border-t border-border">
                        <span className="text-primary">{"//"}</span> {photo.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}


            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </div>

            {/* Impact */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <span className="font-mono text-sm text-primary">
                <span className="text-muted-foreground">{"//"}</span> Impact: {project.impact}
              </span>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-2">
            <CodeDivider label="Challenges" />
          </div>

          {/* Challenges */}
          <div className="mb-12 opacity-0 animate-fade-in-up stagger-3">
            <ul className="space-y-3">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="font-mono text-primary mt-1">→</span>
                  <span className="text-muted-foreground">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-3">
            <CodeDivider label="Features" />
          </div>

          {/* Features */}
          <div className="mb-12 opacity-0 animate-fade-in-up stagger-4">
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="font-mono text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-border opacity-0 animate-fade-in-up stagger-4">
            <Button
              variant="outline"
              className="font-mono"
              disabled={!project.repoUrl}
              onClick={() => project.repoUrl && window.open(project.repoUrl, "_blank", "noopener,noreferrer")}
            >
              <Github className="mr-2 h-4 w-4" />
              View Code
            </Button>
            {project.demoUrl && (
              <Button
                variant="outline"
                className="font-mono"
                onClick={() => project.demoUrl && window.open(project.demoUrl, "_blank", "noopener,noreferrer")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
