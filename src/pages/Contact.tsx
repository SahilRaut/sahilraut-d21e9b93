import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    window.location.href = `mailto:hisahiltech@gmail.com?subject=${subject}&body=${body}`;

    toast({
      title: "Opening your email app",
      description: "Your message is ready to send to hisahiltech@gmail.com.",
    });

    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          {/* Page Header */}
          <div className="max-w-2xl mb-12">
            <h1 className="retro-text font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mb-6 pr-2">
              Contact
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Have a project in mind or want to discuss opportunities? 
              I'm always open to interesting conversations and collaborations.
            </p>
          </div>

          <div className="max-w-2xl">
            {/* Contact Form */}
            <div>
              <CodeDivider label="Send a Message" />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-mono text-sm">
                    <span className="text-primary">//</span> Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-card border-border font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono text-sm">
                    <span className="text-primary">//</span> Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-card border-border font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-mono text-sm">
                    <span className="text-primary">//</span> Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    required
                    className="bg-card border-border font-mono text-sm resize-none"
                  />
                </div>

                <Button type="submit" className="font-mono">
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
