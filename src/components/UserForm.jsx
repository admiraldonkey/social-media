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
    <div className="flex flex-col">
      <div className="flex flex-col items-center my-6">
        <div className="bg-myDarkGrey p-4 rounded-3xl flex flex-col items-center w-4/5">
          <h2 className="text-4xl text-myLightBlue pb-2">Welcome!</h2>
          <h3 className="text-2xl text-white">
            Please enter a username and bio to continue
          </h3>
          <form action={handleAddUser} className="flex flex-col w-3/5 mt-6">
            <label htmlFor="username" className="text-myLightBlue">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              required
              className="px-1 py-1 mb-6 mt-2"
            />
            <label htmlFor="bio" className="text-myLightBlue">
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              placeholder="Enter a short bio"
              required
              className="px-1 py-1 mt-2"
              rows="6"
            ></textarea>
            <div className="flex justify-center">
              <button className="bg-myLightBlue text-myBlack hover:bg-myDarkBlue hover:text-white text-3xl rounded-xl px-2 py-1 mt-6 mb-2 w-min">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
