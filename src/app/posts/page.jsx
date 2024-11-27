import { db } from "@/lib/db";

export default async function PostsPage() {
  const postsResponse = await db.query(`SELECT * FROM posts`);
  const posts = postsResponse.rows;

  return (
    <div>
      <h2>Db connection test:</h2>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>Posted by: {post.clerk_id}</h2>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}
