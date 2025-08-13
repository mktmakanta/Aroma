export default function CommentList({ comments = [] }) {
  if (!comments.length)
    return <p className="text-gray-500">No comments yet.</p>;
  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <div
          key={c.id}
          className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
        >
          <p className="text-gray-700">{c.content}</p>
          <small className="text-gray-500">
            By {c.author?.name ?? "Anonymous"} •{" "}
            {new Date(c.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
}
