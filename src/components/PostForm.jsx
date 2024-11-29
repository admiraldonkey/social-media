import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function PostForm() {
  async function handleSubmitPost(formData) {
    "use server";
    const { userId } = await auth();
    const content = formData.get("content");
    db.query(`INSERT INTO posts (content, clerk_id) VALUES ($1, $2)`, [
      content,
      userId,
    ]);
    redirect("/posts");
  }

  return (
    <div>
      <SignedIn>
        <h2>New Post form goes here</h2>
        <form action={handleSubmitPost}>
          <label htmlFor="content">What would you like to post?</label>
          <textarea
            name="content"
            id="content"
            placeholder="Enter post"
            required
          ></textarea>
          <button>Submit</button>
        </form>
      </SignedIn>
      <SignedOut>
        <h2>Please sign in to make a post</h2>
      </SignedOut>
    </div>
  );
}
