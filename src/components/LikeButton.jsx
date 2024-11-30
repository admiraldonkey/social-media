import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default function LikeButton({ postId, likes, path }) {
  async function handleLikePost() {
    "use server";
    const newLikes = likes + 1;
    db.query(`UPDATE posts SET likes = $1 WHERE id = $2`, [newLikes, postId]);
    console.log(postId, likes, path);
    revalidatePath(path);
  }

  return (
    <form action={handleLikePost} className="">
      <button className="bg-myLightBlue text-myBlack hover:bg-myDarkBlue hover:text-white rounded-xl px-2 py-1 ml-2">
        Like
      </button>
    </form>
  );
}
