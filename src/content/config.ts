import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        link: z.string().or(z.null()),
        cover: image()
    }),
});

export const collections = {
    projects: projectsCollection
};