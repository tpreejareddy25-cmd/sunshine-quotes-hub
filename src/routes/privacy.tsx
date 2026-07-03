import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Daily Motivation" },
      { name: "description", content: "How Daily Motivation handles your data — favorites and theme preferences stay on your device." },
      { property: "og:title", content: "Privacy Policy — Daily Motivation" },
      { property: "og:description", content: "Our privacy commitment: data stays on your device." },
      { property: "og:url", content: "https://sunshine-quotes-hub.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://sunshine-quotes-hub.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-animated-gradient">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl glass">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-8 space-y-6 rounded-3xl glass p-6 text-foreground/90 sm:p-10">
          <section>
            <h2 className="font-display text-xl font-semibold">1. What we collect</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Daily Motivation does not require an account and does not collect personal
              information. Your saved favorites and theme preference are stored only in
              your browser's local storage — they never leave your device.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold">2. Cookies & analytics</h2>
            <p className="mt-2 text-sm leading-relaxed">
              We do not set tracking cookies. Aggregate, anonymous usage metrics may be
              collected by our hosting provider strictly to keep the site healthy.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold">3. Third-party content</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Images may be served from Unsplash and fonts from Google Fonts. When you
              use the Share buttons, your browser opens the target service (WhatsApp, X,
              Instagram) under their own privacy policies.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold">4. Contact</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Questions? Reach us via the <Link to="/contact" className="text-primary underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
