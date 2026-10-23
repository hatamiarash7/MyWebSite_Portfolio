import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;
export type ProjectLink = Project["data"]["links"][number];

export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => b.data.order - a.data.order);
}

/** Stack items shared by at least `minCount` projects, most common first. */
export function getTags(projects: Project[], minCount = 3) {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const item of project.data.stack) counts.set(item, (counts.get(item) ?? 0) + 1);
  }
  return [...counts]
    .filter(([, count]) => count >= minCount)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count }));
}

export const linkMeta: Record<ProjectLink["kind"], { icon: string; event: string }> = {
  repo: { icon: "simple-icons:github", event: "Github+Link" },
  demo: { icon: "tabler:world", event: "Demo" },
  download: { icon: "tabler:download", event: "Download" },
  post: { icon: "tabler:article", event: "Blog" },
};
