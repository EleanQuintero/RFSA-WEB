import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';


const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.md', }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		tags: z.array(z.string()),
		img_cover: z.string(),
		img_alt: z.string().optional(),
	}),
})

const testimonials = defineCollection({
	loader: glob({ base: './src/content/testimonials', pattern: '**/*.md', }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		sport: z.string(),
		img: z.string(),
		img2: z.string().optional(),
		img3: z.string().optional(),
		img4: z.string().optional(),
		img5: z.string().optional(),
		rating: z.union([z.number(), z.string()]).transform(val => typeof val === 'string' ? parseInt(val) : val),
		testimonial: z.string(),
		url: z.string()
	}),
})

const legal = defineCollection({
	loader: glob({ base: './src/content/legal', pattern: '**/*.md', }),
	schema: z.object({
		title: z.string(),
		description: z.string()
	}),
})

export const collections = {
	posts, testimonials, legal
};
