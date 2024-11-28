import { GetPosts } from "@/components/GetData";
import PostForm from "@/components/PostForm";

export default async function PostsPage() {
  const posts = await GetPosts();

  return (
    <div>
      <h2>Db connection test:</h2>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <h2>Posted by: {post.clerk_id}</h2>
              <p>{post.content}</p>
            </div>
          );
        })}
      <PostForm />
    </div>
  );
}
