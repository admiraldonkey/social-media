import DisplayPosts from "@/components/DisplayPosts";
import PostForm from "@/components/PostForm";
import { SortPosts } from "@/components/SortPosts";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default async function PostsPage({ searchParams }) {
  const sortBy = (await searchParams).sort || "all";
  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col px-6 py-6">
        <SignedOut>
          <h4>Sign In to filter posts</h4>
        </SignedOut>
        <SignedIn>
          <SortPosts />
        </SignedIn>
      </div>
      <DisplayPosts postType={`${sortBy}`} />
      <PostForm />
    </div>
  );
}
