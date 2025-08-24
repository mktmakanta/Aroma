import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link
      href={`/posts/${post.id}`} // change to post.slug if you use [slug]
      className="block p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
    >
      <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
      {post.content && (
        <p className="mt-2 text-gray-600">{post.content.slice(0, 150)}...</p>
      )}
      <p className="mt-4 text-sm text-gray-400">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </Link>
  );
}
