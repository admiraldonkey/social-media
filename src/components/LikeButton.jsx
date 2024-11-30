import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Component that displays a like button and handles logic to update the database record of the associated post
export default function LikeButton({ postId, likes, path }) {
  // Adds 1 to current likes value of the post in question, then updates the database record with the increased like value
  async function handleLikePost() {
    "use server";
    const newLikes = likes + 1;
    db.query(`UPDATE posts SET likes = $1 WHERE id = $2`, [newLikes, postId]);
    // Refreshes the page to show the updated like value. Path is dynamic, depending on where post was liked and passed as a prop so appropriate page is refreshed.
    revalidatePath(path);
  }

  // Renders the like button and calles the handler function when clicked
  return (
    <form action={handleLikePost}>
      <button className="bg-myLightBlue text-myBlack hover:bg-myDarkBlue hover:text-white rounded-xl px-2 py-1 ml-2">
        Like
      </button>
    </form>
  );
}
