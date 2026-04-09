import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function PostsPage() {
  // This would typically fetch from an API or database
  const posts = [
    {
      id: 3,
      title: "The Art of Letting Go: A Practical Guide to Decluttering",
      excerpt:
        'Clutter isn\'t just physical stuff—it\'s mental weight. Every item we keep "just in case" or "for someday" takes up not only space in our homes but also space in our minds. But how do we decide what stays and what goes?',
      date: "2025-02-05",
      slug: "the-art-of-letting-go-a-practical-guide-to-decluttering",
    },
    {
      id: 2,
      title: "A Guide to Getting Rid of Almost Everything",
      excerpt:
        "Most people vastly overestimate how much they actually need to live comfortably. Research suggests that we only use about 20% of what we own on a daily basis.",
      date: "2025-02-05",
      slug: "a-guide-to-getting-rid-of-almost-everything",
    },
    {
      id: 1,
      title: "How to Declutter Your Home, With the help of AI",
      excerpt:
        "Clutter has a sneaky way of accumulating in our homes. We hold onto things we no longer need, often without realizing the emotional and psychological reasons behind it.",
      date: "2025-01-20",
      slug: "how-to-declutter-your-home-with-the-help-of-ai",
    },
    // Add more sample posts as needed
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
