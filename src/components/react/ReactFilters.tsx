import React, { useState } from "react";
import type { CollectionEntry } from "astro:content";

interface ReactFiltersProps {
  posts: CollectionEntry<"posts">[];
  categories: string[];
}

const ReactFilters: React.FC<ReactFiltersProps> = ({ posts, categories }) => {
  const [filteredPosts, setFilteredPosts] =
    useState<CollectionEntry<"posts">[]>(posts);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    if (category === "all") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => post.data.tags[0] === category);
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-buttons flex gap-4 flex-wrap justify-center my-8">
        <button
          className={`px-6 py-2 rounded-md transition-colors ${
            activeCategory === "all"
              ? " bg-[var(--gray-900)] text-[var(--gray-100)]"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handleCategoryChange("all")}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeCategory === category
                ? "bg-[var(--gray-900)] text-[var(--gray-100)]"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center w-full justify-center lg:grid lg:grid-cols-3 gap-10 lg:max-w-6xl mx-auto">
        {filteredPosts.map((post) => (
          <a
            key={post.id}
            href={`/post/${post.id}/`}
            className="post-item block bg-[var(--gray-900)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-sm w-full"
          >
            {post.data.img_cover && (
              <div className="relative w-full">
                <img
                  src={post.data.img_cover}
                  alt={post.data.img_alt || post.data.title}
                  className="w-full h-48 object-cover"
                  data-astro-transition-name={`img-${post.data.title}`}
                />
                <div className="absolute top-4 left-4 bg-[var(--gray-900)] text-[var(--gray-100)] px-4 py-1 text-sm font-semibold">
                  {post.data.tags[0].toUpperCase()}
                </div>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">{post.data.title}</h3>
              <p className="text-[var(--gray-100)] mb-4">
                {post.data.description}
              </p>
              <div className="flex justify-between items-center">
                {/*<p className="text-gray-500 text-sm">
                  {new Date(post.data.publishDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>*/}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ReactFilters;
