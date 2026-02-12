import type { CollectionEntry } from 'astro:content';

type PostEntry = CollectionEntry<"posts">;
type PostData = PostEntry['data'];

const test: PostData = {
  title: "test",
  description: "test",
  publishDate: new Date(),
  tags: ["test"],
  img_cover: "test",
  img_alt: "test"
};
