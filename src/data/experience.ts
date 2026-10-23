export interface Experience {
  role: string;
  company: string;
  period: string;
  summary?: string;
  placeholder?: boolean;
}

// PLACEHOLDER: replace these entries with real work history before release.
// Entries flagged `placeholder` are rendered in development only.
export const experience: Experience[] = [
  {
    role: "SRE",
    company: "Arvancloud",
    period: "۱۴۰۱ — اکنون",
    placeholder: true,
  },
  {
    role: "SRE / Network Eng",
    company: "Azhvan",
    period: "۱۳۹۸ — ۱۴۰۱",
    placeholder: true,
  },
  {
    role: "Co-Founder & CTO",
    company: "Ateriad",
    period: "۱۳۹۳ — ۱۳۹۸",
    placeholder: true,
  },
  {
    role: "Infrastructure Manager",
    company: "Gozine 2",
    period: "۱۳۹۳ — ۱۳۹۵",
    placeholder: true,
  },
];
