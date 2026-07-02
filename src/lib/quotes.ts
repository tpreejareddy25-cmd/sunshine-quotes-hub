export type Category = "Success" | "Self Confidence" | "Study" | "Fitness" | "Life" | "Happiness";

export interface Quote {
  id: number;
  text: string;
  author: string;
  category: Category;
}

export const CATEGORIES: Category[] = [
  "Success",
  "Self Confidence",
  "Study",
  "Fitness",
  "Life",
  "Happiness",
];

export const QUOTES: Quote[] = [
  { id: 1, text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill", category: "Success" },
  { id: 2, text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Success" },
  { id: 3, text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", category: "Success" },
  { id: 4, text: "Opportunities don't happen. You create them.", author: "Chris Grosser", category: "Success" },
  { id: 5, text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "Self Confidence" },
  { id: 6, text: "You are enough just as you are.", author: "Meghan Markle", category: "Self Confidence" },
  { id: 7, text: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem", category: "Self Confidence" },
  { id: 8, text: "Confidence comes not from always being right but from not fearing to be wrong.", author: "Peter T. Mcintyre", category: "Self Confidence" },
  { id: 9, text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King", category: "Study" },
  { id: 10, text: "Study while others are sleeping; work while others are loafing.", author: "William A. Ward", category: "Study" },
  { id: 11, text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", category: "Study" },
  { id: 12, text: "The expert in anything was once a beginner.", author: "Helen Hayes", category: "Study" },
  { id: 13, text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn", category: "Fitness" },
  { id: 14, text: "The body achieves what the mind believes.", author: "Napoleon Hill", category: "Fitness" },
  { id: 15, text: "Sweat is just fat crying.", author: "Unknown", category: "Fitness" },
  { id: 16, text: "Strength does not come from the body. It comes from the will.", author: "Mahatma Gandhi", category: "Fitness" },
  { id: 17, text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "Life" },
  { id: 18, text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", category: "Life" },
  { id: 19, text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "Life" },
  { id: 20, text: "Life is really simple, but we insist on making it complicated.", author: "Confucius", category: "Life" },
  { id: 21, text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", category: "Happiness" },
  { id: 22, text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson", category: "Happiness" },
  { id: 23, text: "The most important thing is to enjoy your life—to be happy—it's all that matters.", author: "Audrey Hepburn", category: "Happiness" },
  { id: 24, text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi", category: "Happiness" },
  { id: 25, text: "Dream big. Start small. Act now.", author: "Robin Sharma", category: "Success" },
  { id: 26, text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky", category: "Self Confidence" },
  { id: 27, text: "Push yourself, because no one else is going to do it for you.", author: "Unknown", category: "Fitness" },
  { id: 28, text: "Learning never exhausts the mind.", author: "Leonardo da Vinci", category: "Study" },
  { id: 29, text: "Enjoy the little things in life, for one day you'll look back and realize they were the big things.", author: "Kurt Vonnegut", category: "Happiness" },
  { id: 30, text: "Every day may not be good, but there's something good in every day.", author: "Alice Morse Earle", category: "Life" },
];

export function getDailyQuote(quotes: Quote[] = QUOTES): Quote {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  return quotes[day % quotes.length];
}
