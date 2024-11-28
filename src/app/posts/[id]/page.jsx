import { GetPosts } from "@/components/GetData";
import { notFound } from "next/navigation";

export default async function IndividualPostPage({ params }) {
  const postId = (await params).id;
  const post = await GetPosts("post", postId);
  if (!post) {
    notFound();
  }

  return (
    <div>
      <h2>Individual posts get displayed here</h2>
      <div>
        <h2>Posted by: {post.clerk_id}</h2>
        <p>{post.content}</p>
      </div>
    </div>
  );
}
