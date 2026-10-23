import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image().optional(),
      order: z.number().int().positive(),
      year: z.number().int().min(1380).max(1500),
      openSource: z.boolean(),
      featured: z.boolean().default(false),
      stack: z.array(z.string()).min(1),
      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.url(),
            kind: z.enum(["repo", "demo", "download", "post"]),
          }),
        )
        .default([]),
    }),
});

export const collections = { projects };
