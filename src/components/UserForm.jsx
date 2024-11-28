import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export default function UserForm() {
  async function handleAddUser(formData) {
    "use server";
    const { userId } = await auth();
    const username = formData.get("username");
    const bio = formData.get("bio");
    await db.query(
      `INSERT INTO users (username, bio, clerk_id) VALUES ($1, $2, $3)`,
      [username, bio, userId]
    );
    revalidatePath("/user");
  }

  return (
    <div>
      <h2>User form goes here</h2>
      <form action={handleAddUser}>
        <label htmlFor="username">Please choose a username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter Username"
          required
        />
        <label htmlFor="bio">Please enter a short bio</label>
        <textarea
          name="bio"
          id="bio"
          placeholder="Enter bio"
          required
        ></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}
