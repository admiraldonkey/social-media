import DisplayPosts from "@/components/DisplayPosts";
import PostForm from "@/components/PostForm";
import { SortPosts } from "@/components/SortPosts";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default async function PostsPage({ searchParams }) {
  const sortBy = (await searchParams).sort || "all";
  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col px-6 py-6">
        <SignedOut>
          <h4>Sign In to filter posts</h4>
        </SignedOut>
        <SignedIn>
          <div className="flex justify-around items-center">
            <SortPosts />
            <Link
              href="/posts/new"
              className="bg-myDarkGrey px-4 py-2 text-white rounded-3xl mt-8 hover:bg-myLightBlue hover:text-myBlack border-2 border-myDarkGrey"
            >
              New Post
            </Link>
          </div>
        </SignedIn>
      </div>
      <DisplayPosts postType={`${sortBy}`} />
    </div>
  );
}
