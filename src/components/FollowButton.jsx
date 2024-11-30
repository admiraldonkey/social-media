import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { GetFollowers } from "./GetData";

export default async function FollowButton({ self, user }) {
  // Checks if logged in user currently follows the user in question
  const follows = await GetFollowers("match", self.id, user.id);

  // Adds a record to the followers db table to reflect that user is now followed
  async function handleAddFollower() {
    "use server";
    db.query(`INSERT INTO followers (user_id, follows) VALUES ($1, $2)`, [
      self.id,
      user.id,
    ]);
    // Revalidates the page to reflect the change to user
    revalidatePath(`/user/${user.id}`);
  }

  // Removes the record from followers db table to reflect that user has been unfollowed
  async function handleRemoveFollower() {
    "use server";
    console.log("sad face");
    db.query(`DELETE FROM followers WHERE user_id = $1 AND follows = $2`, [
      self.id,
      user.id,
    ]);
    // Revalidates the page to reflect the change to user
    revalidatePath(`/user/${user.id}`);
  }

  // If user is currently followed then displays an unfollow button, otherwise display the follow button. Relevant handler function runs as required
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
