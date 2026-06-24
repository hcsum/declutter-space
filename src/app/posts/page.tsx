import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function PostsPage() {
  // This would typically fetch from an API or database
  const posts: Array<{
    id: number;
    title: string;
    excerpt: string;
    date: string;
    slug: string;
  }> = [
    // Add blog posts here as they are published.
  ];

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-12 text-gray-700 dark:text-gray-200">
        Recent Posts
      </h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow mb-12"
          >
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-2">{post.excerpt}</p>
              <time className="text-sm text-gray-600">{post.date}</time>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
