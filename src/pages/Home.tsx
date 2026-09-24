import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { CodeLabel } from "@/components/ui/CodeLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { TypingCursor } from "@/components/ui/TypingCursor";
import { BinaryGlitchText } from "@/components/ui/BinaryGlitchText";
import { NeuralField } from "@/components/lab/NeuralField";
import { ArrowRight } from "lucide-react";


export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <HeroLab className="pointer-events-none absolute inset-0" />
        <BinaryRain className="pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl opacity-0 animate-fade-in-up">
            {/* Code-style label */}
            <CodeLabel className="mb-6">AI Robotics Software Developer</CodeLabel>

            {/* Headline with typing cursor */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <BinaryGlitchText text="Hi, I'm Sahil Raut." speed={30} hold={2} />
              <br />
              <BinaryGlitchText
                text="I build the intelligence behind robots"
                className="text-muted-foreground"
                speed={26}
                hold={1}
                delay={700}
                loop={14000}
              />
              <TypingCursor />
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed opacity-0 animate-fade-in-up stagger-1">
              An AI robotics software developer at NEURA Robotics in Germany, bridging deep learning research and physical hardware so robots can learn and adapt to novel tasks end to end.
            </p>

            {/* CTA */}
            <div className="opacity-0 animate-fade-in-up stagger-2">
              <Button asChild size="lg" className="font-mono transition-transform hover:scale-105">
                <Link to="/work">
                  View Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Projects */}
      <section className="py-20">
        <div className="container">
          <div className="opacity-0 animate-fade-in-up">
            <CodeDivider label="Featured Work" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.slice(0, 4).map((project, index) => (
              <div 
                key={project.name} 
                className={`opacity-0 animate-fade-in-up stagger-${index + 1}`}
              >
                <ProjectCard {...project} className="hover-lift" />
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="mt-12 text-center opacity-0 animate-fade-in-up stagger-4">
            <Link 
              to="/work" 
              className="inline-flex items-center font-mono text-sm text-muted-foreground hover:text-primary transition-colors link-underline"
            >
              <span className="text-primary mr-2">{"//"}</span>
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
