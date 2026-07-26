export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  published: boolean;
};

export const faqItems: FaqItem[] = [
  {
    id: "f1",
    question: "How fast can SyncReach launch our first campaign?",
    answer:
      "Most clients are live within 14 days. Infrastructure setup and warm up takes the first 10, copy and targeting the rest.",
    sortOrder: 1,
    published: true,
  },
  {
    id: "f2",
    question: "What kind of reply rates should we expect?",
    answer:
      "Well targeted campaigns average 8 to 15% reply rates in the first 60 days, with positive replies typically 2 to 4% of sends.",
    sortOrder: 2,
    published: true,
  },
  {
    id: "f3",
    question: "Do you handle deliverability and inbox warm up?",
    answer:
      "Yes, every inbox is warmed on our private network and monitored 24/7 so your sends land in the primary inbox, not spam.",
    sortOrder: 3,
    published: true,
  },
  {
    id: "f4",
    question: "Which industries do you specialize in?",
    answer:
      "B2B SaaS, agencies, professional services, and fintech. If your ACV is above $2k, we can build a pipeline for you.",
    sortOrder: 4,
    published: true,
  },
  {
    id: "f5",
    question: "What if it doesn't work?",
    answer:
      "We work in 90 day cycles with clear KPIs. If we miss the target, we keep working at no extra cost until we hit it.",
    sortOrder: 5,
    published: true,
  },
];
