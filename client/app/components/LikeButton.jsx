"use client";
import { useTransition } from "react";
import useSWR, { useSWRConfig } from "swr";
import { toggleLike } from "@/lib/api-client";

// Expect your post API to return likes count and whether current user liked
export default function LikeButton({ postId }) {
  const { mutate } = useSWRConfig();
  const [isPending, startTransition] = useTransition();
  const { data: post } = useSWR(`/api/posts/${postId}`); // read likes from cached post

  const liked = post?.likedByMe ?? false;
  const count = post?.likesCount ?? 0;

  const onClick = () => {
    startTransition(async () => {
      // optimistic update
      mutate(
        `/api/posts/${postId}`,
        (prev) =>
          prev
            ? {
                ...prev,
                likedByMe: !prev.likedByMe,
                likesCount: prev.likedByMe
                  ? prev.likesCount - 1
                  : prev.likesCount + 1,
              }
            : prev,
        false
      );
      try {
        await toggleLike(postId);
      } finally {
        // revalidate
        mutate(`/api/posts/${postId}`);
      }
    });
  };

  return (
    <button
      className="mt-4 px-3 py-1 rounded-xl border text-sm"
      onClick={onClick}
      disabled={isPending}
    >
      {liked ? "♥ Liked" : "♡ Like"} • {count}
    </button>
  );
}
