import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, ArrowLeft, MessageCircle, Instagram } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Daily Motivation" },
      { name: "description", content: "Get in touch with the Daily Motivation team — feedback, suggestions, quote submissions and partnerships." },
      { property: "og:title", content: "Contact — Daily Motivation" },
      { property: "og:description", content: "Reach out to the Daily Motivation team." },
      { property: "og:url", content: "https://sunshine-quotes-hub.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://sunshine-quotes-hub.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="relative min-h-screen bg-animated-gradient">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
        <h1 className="mt-6 font-display text-3xl font-bold sm:text-4xl">Contact us</h1>
        <p className="mt-3 text-muted-foreground">
          We'd love to hear from you. Suggestions, favorite quotes, partnerships — all welcome.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a href="mailto:hello@dailymotivation.app" className="flex items-start gap-3 rounded-2xl glass p-5 transition-transform hover:-translate-y-0.5">
            <Mail className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm text-muted-foreground">hello@dailymotivation.app</p>
            </div>
          </a>
          <a href="https://wa.me/" target="_blank" rel="noreferrer" className="flex items-start gap-3 rounded-2xl glass p-5 transition-transform hover:-translate-y-0.5">
            <MessageCircle className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">WhatsApp</p>
              <p className="text-sm text-muted-foreground">Chat with us</p>
            </div>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-start gap-3 rounded-2xl glass p-5 transition-transform hover:-translate-y-0.5">
            <Instagram className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">Instagram</p>
              <p className="text-sm text-muted-foreground">@dailymotivation</p>
            </div>
          </a>
        </div>

        <form className="mt-8 space-y-3 rounded-3xl glass p-6 sm:p-8" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch."); }}>
          <div className="grid gap-3 sm:grid-cols-2">
            <input required placeholder="Your name" className="h-11 rounded-xl border border-border bg-background/50 px-4 text-sm outline-none focus:ring-2 focus:ring-primary" />
            <input required type="email" placeholder="Your email" className="h-11 rounded-xl border border-border bg-background/50 px-4 text-sm outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <textarea required placeholder="Your message" rows={5} className="w-full rounded-xl border border-border bg-background/50 p-4 text-sm outline-none focus:ring-2 focus:ring-primary" />
          <button type="submit" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg hover:opacity-90">
            Send message
          </button>
        </form>
      </div>
      <SiteFooter />
    </div>
  );
}
