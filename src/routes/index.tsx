import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Copy, Share2, Heart, ArrowRight, Sun, Moon, Search, Sparkles, Quote as QuoteIcon, X } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QUOTES, CATEGORIES, getDailyQuote, type Quote, type Category } from "@/lib/quotes";

export const Route = createFileRoute("/")({
  component: Index,
});

const FAV_KEY = "dm_favorites";
const THEME_KEY = "dm_theme";

function Index() {
  const [dark, setDark] = useState(false);
  const [category, setCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavs, setShowFavs] = useState(false);
  const [currentId, setCurrentId] = useState<number>(() => getDailyQuote().id);

  useEffect(() => {
    const t = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = t ? t === "dark" : prefersDark;
    setDark(isDark);
    const favs = localStorage.getItem(FAV_KEY);
    if (favs) try { setFavorites(JSON.parse(favs)); } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const filtered = useMemo(() => {
    return QUOTES.filter((q) => {
      if (category !== "All" && q.category !== category) return false;
      if (search && !(`${q.text} ${q.author}`.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    });
  }, [category, search]);

  const pool = showFavs ? QUOTES.filter((q) => favorites.includes(q.id)) : filtered;
  const current = QUOTES.find((q) => q.id === currentId) ?? QUOTES[0];

  const next = () => {
    const src = pool.length > 0 ? pool : QUOTES;
    let n = current;
    for (let i = 0; i < 8; i++) {
      const candidate = src[Math.floor(Math.random() * src.length)];
      if (candidate.id !== current.id) { n = candidate; break; }
      n = candidate;
    }
    setCurrentId(n.id);
  };

  const toggleFav = (id: number) => {
    setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
  };

  const copyQuote = async () => {
    await navigator.clipboard.writeText(`"${current.text}" — ${current.author}`);
    toast.success("Quote copied to clipboard");
  };

  const shareQuote = async () => {
    const data = { title: "Daily Motivation", text: `"${current.text}" — ${current.author}` };
    if (navigator.share) {
      try { await navigator.share(data); } catch {}
    } else {
      await navigator.clipboard.writeText(data.text);
      toast.success("Copied — share it anywhere!");
    }
  };

  const isFav = favorites.includes(current.id);

  return (
    <div className="relative min-h-screen overflow-hidden bg-animated-gradient">
      <Toaster position="top-center" />

      {/* Decorative blurred orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-6 sm:px-8 sm:py-10">
        {/* Header */}
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl glass">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium uppercase tracking-widest text-muted-foreground">Daily Motivation</p>
              <h1 className="truncate font-display text-lg font-bold text-foreground sm:text-xl">Start your day with positivity.</h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="glass rounded-full"
              aria-label={showFavs ? "Show all quotes" : "Show favorites"}
              onClick={() => setShowFavs((v) => !v)}
            >
              <Heart className={`h-4 w-4 ${showFavs ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="glass rounded-full"
              aria-label="Toggle theme"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </header>

        {/* Search */}
        <div className="mt-6 flex items-center gap-2 rounded-2xl glass px-4 py-2">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quotes or authors…"
            className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground" aria-label="Clear">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "bg-foreground text-background shadow-lg"
                    : "glass text-foreground/80 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Quote card */}
        <main className="mt-8 flex flex-1 items-center justify-center">
          <article
            key={current.id}
            className="w-full animate-fade-in rounded-3xl glass p-7 shadow-2xl sm:p-12"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                {current.category}
              </span>
              <QuoteIcon className="h-8 w-8 text-primary/40" />
            </div>

            <blockquote className="mt-6 font-display text-2xl font-medium leading-snug text-foreground sm:text-4xl sm:leading-tight">
              "{current.text}"
            </blockquote>

            <p className="mt-6 text-sm font-medium text-muted-foreground sm:text-base">
              — {current.author}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <Button onClick={next} className="rounded-full gap-2">
                Next Quote <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" onClick={copyQuote} className="rounded-full gap-2">
                <Copy className="h-4 w-4" /> Copy
              </Button>
              <Button variant="secondary" onClick={shareQuote} className="rounded-full gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Button
                variant={isFav ? "default" : "secondary"}
                onClick={() => toggleFav(current.id)}
                className="rounded-full gap-2"
                aria-pressed={isFav}
              >
                <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
                {isFav ? "Saved" : "Save"}
              </Button>
            </div>
          </article>
        </main>

        {/* Results / favorites list */}
        {(search || category !== "All" || showFavs) && (
          <section className="mt-10">
            <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
              {showFavs ? "Your favorites" : "Matching quotes"}
              <span className="ml-2 text-sm font-normal text-muted-foreground">({pool.length})</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {pool.length === 0 && (
                <p className="text-sm text-muted-foreground">No quotes found.</p>
              )}
              {pool.slice(0, 20).map((q) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentId(q.id)}
                  className="group rounded-2xl glass p-4 text-left transition-transform hover:-translate-y-0.5"
                >
                  <p className="line-clamp-2 text-sm text-foreground">"{q.text}"</p>
                  <p className="mt-2 text-xs text-muted-foreground">— {q.author} · {q.category}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-10 pt-4 text-center text-xs text-muted-foreground">
          Made with love · A fresh quote every day
        </footer>
      </div>
    </div>
  );
}
