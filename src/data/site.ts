export const site = {
  url: "https://portfolio.arash-hatami.ir",
  name: "آرش حاتمی",
  nameEn: "Arash Hatami",
  title: "آرش حاتمی | مهندس SRE و توسعه‌دهنده بک‌اند",
  description:
    "پورتفولیوی آرش حاتمی؛ مهندس SRE و توسعه‌دهنده بک‌اند. پروژه‌های متن‌باز، ابزارهای زیرساخت، شبکه و سرویس‌های بک‌اند.",
  locale: "fa_IR",
  repository: "https://github.com/hatamiarash7/MyWebSite_Portfolio",
  blog: "https://arash-hatami.ir?utm_source=Portfolio",
  twitter: "@hatamiarash7",
  themeColor: { dark: "#08090b", light: "#f6f7f8" },
} as const;

export const profile = {
  role: "مهندس SRE و توسعه‌دهنده بک‌اند",
  eyebrow: "SRE · Backend",
  bio: "برنامه‌نویسی را از سال ۱۳۸۵ با C/CPP و VB شروع کردم و امروز بیشتر وقتم صرف خودکارسازی زیرساخت، CI/CD، کانتینرها و شبکه می‌شود. پروژه ها و ابزارهایی که برای حل مشکلات روزمره می‌سازم را تا جای ممکن متن‌باز منتشر می‌کنم.",
  handle: "hatamiarash7",
  email: "info@arash-hatami.ir",
  startYear: 2016,
  sameAs: [
    "https://github.com/hatamiarash7",
    "https://gitlab.com/hatamiarash7",
    "https://www.linkedin.com/in/hatamiarash7",
    "https://x.com/hatamiarash7",
    "https://stackoverflow.com/users/4905220/arash-hatami",
  ],
} as const;

export const nav = [
  { label: "خانه", href: "/", hideOnMobile: true },
  { label: "پروژه‌ها", href: "/projects" },
  { label: "وبلاگ", href: site.blog, external: true },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/hatamiarash7", icon: "simple-icons:github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hatamiarash7", icon: "simple-icons:linkedin" },
  { label: "X", href: "https://x.com/hatamiarash7", icon: "simple-icons:x" },
  {
    label: "Stack Overflow",
    href: "https://stackoverflow.com/users/4905220/arash-hatami",
    icon: "simple-icons:stackoverflow",
  },
  { label: "Instagram", href: "https://instagram.com/hatamiarash7", icon: "simple-icons:instagram" },
] as const;

export const skills = [
  {
    title: "زیرساخت و DevOps",
    icon: "tabler:server-2",
    items: ["Linux", "Docker", "Kubernetes", "SaltStack", "Bash", "Terraform", "Prometheus", "Grafana"],
  },
  {
    title: "بک‌اند",
    icon: "tabler:code",
    items: ["Go", "Python", "Django"],
  },
  {
    title: "داده",
    icon: "tabler:database",
    items: ["PostgreSQL", "MySQL", "Redis", "DuckDB", "Clickhouse", "Elasticsearch", "Parquet"],
  },
  {
    title: "شبکه",
    icon: "tabler:network",
    items: ["MikroTik", "WireGuard", "DNS", "BGP", "Anycast"],
  },
] as const;
