import PostForm from "@/components/PostForm";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function NewPostPage() {
  return (
    // <div>
    //   <SignedOut>
    //     <p>You need to sign in to make a post.</p>
    //   </SignedOut>
    <SignedIn>
      <PostForm />
    </SignedIn>
    // </div>
  );
}
