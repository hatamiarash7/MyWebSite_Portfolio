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
    role: "عنوان شغلی",
    company: "نام شرکت",
    period: "۱۴۰۲ — اکنون",
    summary: "یک جمله درباره مسئولیت‌ها و دستاوردها.",
    placeholder: true,
  },
  {
    role: "عنوان شغلی",
    company: "نام شرکت",
    period: "۱۳۹۹ — ۱۴۰۲",
    summary: "یک جمله درباره مسئولیت‌ها و دستاوردها.",
    placeholder: true,
  },
  {
    role: "عنوان شغلی",
    company: "نام شرکت",
    period: "۱۳۹۵ — ۱۳۹۹",
    placeholder: true,
  },
];
