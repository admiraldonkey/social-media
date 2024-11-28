import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { GetFollowers } from "./GetData";

export default async function FollowButton({ self, user }) {
  const follows = await GetFollowers("match", self.id, user.id);

  async function handleAddFollower() {
    "use server";
    db.query(`INSERT INTO followers (user_id, follows) VALUES ($1, $2)`, [
      self.id,
      user.id,
    ]);
    revalidatePath(`/user/${user.id}`);
  }

  async function handleRemoveFollower() {
    "use server";
    console.log("sad face");
    db.query(`DELETE FROM followers WHERE user_id = $1 AND follows = $2`, [
      self.id,
      user.id,
    ]);
    revalidatePath(`/user/${user.id}`);
  }

  return (
    <div>
      {follows ? (
        <div>
          <form action={handleRemoveFollower}>
            <button>Unfollow</button>
          </form>
        </div>
      ) : (
        <form action={handleAddFollower}>
          <button>Follow</button>
        </form>
      )}
    </div>
  );
}
