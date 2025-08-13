import { fetcher } from "./fetcher";

// POSTS
export const getPosts = () => fetcher("/api/posts");
export const getPostById = (id) => fetcher(`/api/posts/${id}`);
export const getPostBySlug = (slug) => fetcher(`/api/posts/slug/${slug}`); // optional if you expose slug route

// COMMENTS
export const getCommentsForPost = (postId) =>
  fetcher(`/api/comments/post/${postId}`);
export const createComment = (postId, content) =>
  fetcher(`/api/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, content }),
  });

// LIKES
export const toggleLike = (postId) =>
  fetcher(`/api/posts/${postId}/like`, { method: "POST" }); // or /api/likes

// TAGS / CATEGORIES
export const getTags = () => fetcher("/api/tags");
export const getCategories = () => fetcher("/api/categories");
