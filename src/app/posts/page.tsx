import Link from "next/link";

export default function PostsPage() {
  // This would typically fetch from an API or database
  const posts = [
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
      title:
        "Overwhelmed by Clutter? Learn How Our AI-Enabled Tool Can Help You Declutter Your Home",
      excerpt:
        "Clutter has a sneaky way of accumulating in our homes. We hold onto things we no longer need, often without realizing the emotional and psychological reasons behind it.",
      date: "2025-01-20",
      slug: "overwhelmed-by-clutter-how-to-declutter-your-home",
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
