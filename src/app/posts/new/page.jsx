import PostForm from "@/components/PostForm";
import { SignedIn } from "@clerk/nextjs";

export default function NewPostPage() {
  return (
    <SignedIn>
      <PostForm />
    </SignedIn>
  );
}
