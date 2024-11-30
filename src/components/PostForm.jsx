import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export default function PostForm() {
  async function handleSubmitPost(formData) {
    "use server";
    const { userId } = await auth();
    const content = formData.get("content");
    db.query(`INSERT INTO posts (content, clerk_id) VALUES ($1, $2)`, [
      content,
      userId,
    ]);
    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center my-6">
        <div className="bg-myDarkGrey p-4 rounded-3xl flex flex-col items-center w-4/5">
          <SignedIn>
            <h2 className="text-4xl text-myLightBlue pb-2">New Post</h2>
            <form
              action={handleSubmitPost}
              className="flex flex-col w-4/5 mt-6"
            >
              <label
                htmlFor="content"
                className="text-myLightBlue mb-4 text-3xl"
              >
                What would you like to post?
              </label>
              <textarea
                name="content"
                id="content"
                placeholder="Enter post"
                rows="10"
                required
                minLength="10"
                className="py-2 px-2"
              ></textarea>
              <div className="flex justify-center">
                <button className="bg-myLightBlue text-myBlack hover:bg-myDarkBlue hover:text-white text-3xl rounded-xl px-2 py-1 mt-6 mb-2 w-min">
                  Submit
                </button>
              </div>
            </form>
          </SignedIn>
          <SignedOut>
            <h2>Please sign in to make a post</h2>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
