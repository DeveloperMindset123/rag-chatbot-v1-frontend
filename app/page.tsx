import Image from "next/image";
import Link from "next/link";
import { GraduationCap, MessageSquare, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background to-background/50" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-radial from-primary/20 to-transparent opacity-50 blur-3xl"
            aria-hidden="true"
          />

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
            <span className="text-primary">MCP-Rag</span> Chatbot
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Connect with our advanced RAG-based chatbot powered by the models of
            your choice.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button
                size="lg"
                className="group transition-all duration-300 ease-in-out"
              >
                Try the Chatbot
                <MessageSquare className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="#features">
              <Button size="lg" variant="outline" className="group">
                Learn More
                <GraduationCap className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our chatbot combines cutting-edge AI with an intuitive interface
              for a seamless experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Multiple LLM Options"
              description="Choose between OpenAI, Claude, Gemini, and Ollama models to power your conversations."
              icon={<Server className="h-8 w-8 text-primary" />}
            />
            <FeatureCard
              title="Audio Capabilities"
              description="Speak to the chatbot and hear responses with high-quality voice synthesis."
              icon={
                <svg
                  className="h-8 w-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              }
            />
            <FeatureCard
              title="Tool Visualization"
              description="See the tools the AI is using to answer your questions in real-time."
              icon={
                <svg
                  className="h-8 w-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              }
            />
            <FeatureCard
              title="Backend Connectivity"
              description="Monitor the status of your backend server to ensure smooth operation."
              icon={
                <svg
                  className="h-8 w-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              }
            />
            <FeatureCard
              title="Beautiful Design"
              description="Enjoy a sleek, intuitive interface with smooth animations and transitions."
              icon={
                <svg
                  className="h-8 w-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12" />
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 18.5v.5" />
                  <path d="M7 12h10" />
                </svg>
              }
            />
            <FeatureCard
              title="RAG-Based Answers"
              description="Get accurate, context-aware responses backed by retrieval augmented generation."
              icon={
                <svg
                  className="h-8 w-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                  <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                </svg>
              }
            />
          </div>

          <div className="mt-16 text-center">
            <Link href="/chat">
              <Button size="lg" className="animate-pulse hover:animate-none">
                Start Chatting Now
                <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Feature Card Component
function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string | any;
  description: string | any;
  icon: any;
}) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-border">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
