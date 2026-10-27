import type { APIRoute } from "astro";
import { profile, site } from "@/data/site";
import { getProjects, type Project } from "@/lib/projects";

export const prerender = true;

/** Keep metadata on one line and prevent it from changing the Markdown structure. */
function text(value: string) {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\\`*_[\]<>]/g, "\\$&");
}

function projectLink(project: Project) {
  const url = new URL(`/projects/${project.id}`, site.url).href;
  const { title, description, stack } = project.data;
  return `- [${text(title)}](${url}): ${text(description)} فناوری‌ها: ${text(stack.join("، "))}.`;
}

export const GET: APIRoute = async () => {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.data.featured);
  const other = projects.filter((project) => !project.data.featured);

  const sections = [
    `# ${text(site.name)} (${text(site.nameEn)})`,
    `> ${text(site.description)}`,
    text(profile.bio),
    [
      "محتوای این سایت فارسی است و سال‌های پروژه‌ها بر اساس تقویم هجری شمسی نوشته شده‌اند.",
      "صفحهٔ هر پروژه شامل توضیحات و پیوندهای مرتبط، مانند مخزن کد، نسخهٔ نمایشی یا دانلود است. پروژه‌ها در هر بخش به ترتیب نمایش سایت فهرست شده‌اند.",
      "برای جزئیات هر پروژه، صفحهٔ آن را بخوانید؛ برای وضعیت فعلی کد و راه‌اندازی، به مخزن همان پروژه مراجعه کنید. متن‌باز بودن یک پروژه به معنی یکسان بودن مجوز همهٔ پروژه‌ها نیست؛ مجوز هر مخزن را جداگانه بررسی کنید.",
      "این فایل راهنمای محتوای سایت است و جایگزین robots.txt یا مجوز استفاده از محتوا نیست.",
    ].join("\n\n"),
    [
      "## صفحات اصلی",
      "",
      `- [خانه](${new URL("/", site.url).href}): معرفی ${text(site.name)}، مهارت‌ها، سوابق و راه‌های ارتباطی.`,
      `- [فهرست پروژه‌ها](${new URL("/projects", site.url).href}): همهٔ پروژه‌ها با امکان فیلتر بر اساس فناوری.`,
    ].join("\n"),
    ...(featured.length ? [["## پروژه‌های منتخب", "", ...featured.map(projectLink)].join("\n")] : []),
    ...(other.length ? [["## دیگر پروژه‌ها", "", ...other.map(projectLink)].join("\n")] : []),
    [
      "## Optional",
      "",
      `- [وبلاگ](${site.blog}): نوشته‌های ${text(site.name)} در وب‌سایتی جداگانه.`,
      `- [کد منبع پورتفولیو](${site.repository}): مخزن کد همین وب‌سایت، نه مخزن همهٔ پروژه‌های معرفی‌شده.`,
    ].join("\n"),
  ];

  return new Response(`${sections.join("\n\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
