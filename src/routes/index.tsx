import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Copy, Share2, Heart, ArrowRight, Sun, Moon, Search, Sparkles,
  Quote as QuoteIcon, X, Star,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { QUOTES, CATEGORIES, getDailyQuote, type Category } from "@/lib/quotes";

export const Route = createFileRoute("/")({
  component: Index,
});

const FAV_KEY = "dm_favorites";
const THEME_KEY = "dm_theme";

// Curated Unsplash images per category (stable photo IDs)
const CATEGORY_IMAGES: Record<Category, string> = {
  "Success": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=70",
  "Self Confidence": "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1400&q=70",
  "Study": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1400&q=70",
  "Fitness": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=70",
  "Life": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=70",
  "Happiness": "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=70",
};

function Index() {
  const [dark, setDark] = useState(false);
  const [category, setCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavs, setShowFavs] = useState(false);
  const dailyQuote = useMemo(() => getDailyQuote(), []);
  const [currentId, setCurrentId] = useState<number>(dailyQuote.id);

  useEffect(() => {
    const t = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(t ? t === "dark" : prefersDark);
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
  const isDaily = current.id === dailyQuote.id;
  const isFav = favorites.includes(current.id);
  const image = CATEGORY_IMAGES[current.category];

  const next = () => {
    const src = pool.length > 0 ? pool : QUOTES;
    let n = current;
    for (let i = 0; i < 10; i++) {
      const candidate = src[Math.floor(Math.random() * src.length)];
      if (candidate.id !== current.id) { n = candidate; break; }
      n = candidate;
    }
    setCurrentId(n.id);
  };

  const toggleFav = (id: number) => {
    setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
  };

  const shareText = `"${current.text}" — ${current.author}`;

  const copyQuote = async () => {
    await navigator.clipboard.writeText(shareText);
    toast.success("Quote copied to clipboard");
  };

  const shareTo = async (target: "native" | "whatsapp" | "x" | "instagram") => {
    const encoded = encodeURIComponent(shareText);
    if (target === "whatsapp") {
      window.open(`https://wa.me/?text=${encoded}`, "_blank");
    } else if (target === "x") {
      window.open(`https://twitter.com/intent/tweet?text=${encoded}`, "_blank");
    } else if (target === "instagram") {
      // Instagram has no web share URL — copy for pasting into story/caption
      await navigator.clipboard.writeText(shareText);
      toast.success("Copied — paste into Instagram!");
      window.open("https://www.instagram.com/", "_blank");
    } else if (navigator.share) {
      try { await navigator.share({ title: "Daily Motivation", text: shareText }); } catch {}
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-animated-gradient">
      <Toaster position="top-center" />

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
              variant="ghost" size="icon" className="glass rounded-full"
              aria-label={showFavs ? "Show all quotes" : "Show favorites"}
              onClick={() => setShowFavs((v) => !v)}
            >
              <Heart className={`h-4 w-4 ${showFavs ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button
              variant="ghost" size="icon" className="glass rounded-full"
              aria-label="Toggle theme" onClick={() => setDark((d) => !d)}
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
                  active ? "bg-foreground text-background shadow-lg" : "glass text-foreground/80 hover:text-foreground"
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
            className="w-full animate-fade-in overflow-hidden rounded-3xl glass shadow-2xl"
          >
            {/* Daily inspirational image */}
            <div className="relative h-44 w-full overflow-hidden sm:h-60">
              <img
                src={image}
                alt={`${current.category} inspiration`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
              <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                {isDaily && (
                  <span className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow-lg">
                    <Star className="h-3 w-3 fill-current" /> Quote of the Day
                  </span>
                )}
                <span className="rounded-full bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
                  {current.category}
                </span>
              </div>
            </div>

            <div className="p-7 sm:p-12">
              <QuoteIcon className="h-8 w-8 text-primary/50" />
              <blockquote className="mt-4 font-display text-2xl font-medium leading-snug text-foreground sm:text-4xl sm:leading-tight">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="rounded-full gap-2">
                      <Share2 className="h-4 w-4" /> Share
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="rounded-xl">
                    <DropdownMenuItem onClick={() => shareTo("whatsapp")}>WhatsApp</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => shareTo("x")}>X (Twitter)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => shareTo("instagram")}>Instagram</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => shareTo("native")}>More…</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
