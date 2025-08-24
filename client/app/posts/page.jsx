"use client";
import useSWR from "swr";
import { getPosts } from "@/lib/api-client";
import PostCard from "@/app/components/PostCard";

export default function PostsPage() {
  const { data: posts, error, isLoading } = useSWR("/api/posts", getPosts);

  if (isLoading) return <p className="text-center mt-10">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Blog Posts</h1>
      <div className="grid gap-6">
        {posts?.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </main>
  );
}
