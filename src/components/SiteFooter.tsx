import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/50 bg-background/40 backdrop-blur">
      <div className="mx-auto grid max-w-5xl gap-6 px-5 py-10 sm:grid-cols-3 sm:px-8">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold">Daily Motivation</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Start your day with positivity — a fresh handpicked quote every day.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">Explore</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">Categories</h3>
          <p className="text-sm text-muted-foreground">
            Love · Success · Life · Study · Fitness · Confidence · Happiness · Emotions
          </p>
        </div>
      </div>
      <div className="border-t border-border/50 px-5 py-4 text-center text-xs text-muted-foreground sm:px-8">
        © {new Date().getFullYear()} Daily Motivation. Made with love.
      </div>
    </footer>
  );
}
