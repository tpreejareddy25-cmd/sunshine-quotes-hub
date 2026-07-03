import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Daily Motivation" },
      { name: "description", content: "Daily Motivation is a handpicked collection of inspirational quotes across love, success, life, fitness, study and more — built to start your day right." },
      { property: "og:title", content: "About — Daily Motivation" },
      { property: "og:description", content: "Learn about Daily Motivation — a modern daily quotes app to inspire positivity." },
      { property: "og:url", content: "https://sunshine-quotes-hub.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://sunshine-quotes-hub.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="relative min-h-screen bg-animated-gradient">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl glass">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">About Daily Motivation</h1>
        </div>
        <div className="mt-8 space-y-4 rounded-3xl glass p-6 text-foreground/90 sm:p-10">
          <p>
            Daily Motivation is a beautifully crafted space to fuel your day with positivity.
            Every morning, a new handpicked quote greets you — timeless wisdom from thinkers,
            leaders, artists and dreamers.
          </p>
          <p>
            Explore hundreds of quotes across categories like <strong>Love</strong>,{" "}
            <strong>Success</strong>, <strong>Life</strong>, <strong>Study</strong>,{" "}
            <strong>Fitness</strong>, <strong>Happiness</strong> and more. Save your favorites,
            search by keyword or author, and share the ones that move you with a single tap.
          </p>
          <p>
            We believe a single sentence can change the direction of a day — and a day can change
            a life. Thank you for making us part of your morning ritual. 💜
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
