"use client";

import useSWR from "swr";
import {
  getPostById,
  getCommentsForPost,
  createComment,
} from "@/lib/api-client";
import CommentList from "@/app/components/CommentList";
import LikeButton from "@/app/components/LikeButton";
// reuse yours

export default function PostPage({ params }) {
  const { id } = params;

  const {
    data: post,
    error: postError,
    isLoading: postLoading,
    mutate: mutatePost,
  } = useSWR(`/api/posts/${id}`, () => getPostById(id));

  const {
    data: comments = [],
    error: commentsError,
    isLoading: commentsLoading,
    mutate: mutateComments,
  } = useSWR(`/api/comments/post/${id}`, () => getCommentsForPost(id));

  if (postLoading || commentsLoading)
    return <p className="text-center mt-10">Loading...</p>;
  if (postError || commentsError)
    return (
      <p className="text-center text-red-500">
        {postError?.message || commentsError?.message}
      </p>
    );

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div
        className="prose prose-lg max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
      />

      <LikeButton postId={post.id} />

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h2>
        <CommentList comments={comments} />

        <div className="mt-6">
          <CommentForm
            postId={post.id}
            onCommentAdded={async (newComment) => {
              // optimistic: prepend locally
              await mutateComments(
                (prev) => [newComment, ...(prev || [])],
                false
              );
              // server insert
              try {
                await createComment(post.id, newComment.content);
              } finally {
                // revalidate
                mutateComments();
              }
            }}
          />
        </div>
      </section>
    </article>
  );
}
