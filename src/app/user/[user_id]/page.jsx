import DisplayPosts from "@/components/DisplayPosts";
import FollowButton from "@/components/FollowButton";
import {
  GetFollowers,
  GetFollowersString,
  GetUser,
} from "@/components/GetData";
import { notFound, redirect } from "next/navigation";

// Displays profile information about a specific user
export default async function IndividualUserPage({ params }) {
  const userId = (await params).user_id;
  const user = await GetUser("userId", userId);
  let clerkId = "";
  if (user) {
    clerkId = (await user).clerk_id;
  }
  // If user could not be found in the database, redirect to the notfound page.
  if (!user) {
    notFound();
  }
  // Gets own user data
  const self = await GetUser("self");
  let isOwnProfile = false;

  // If user is not logged in, redirect them to the home page. If logged in, checks if they are trying to view their own profile via this dynamic route. If so, redirects them to the dedicated /user route.
  if (self) {
    isOwnProfile = user.clerk_id === self.clerk_id;
  } else {
    redirect("/");
  }
  if (isOwnProfile) {
    redirect("/user");
  }

  // Check if you follow this user, and if they follow you
  const followedByYou = await GetFollowers("match", self.id, user.id);
  const followsYou = await GetFollowers("match", user.id, self.id);

  // Dynamic string generated depending on multiple conditions to display the user's follower info
  const followerString = await GetFollowersString(
    "user",
    user.id,
    followedByYou
  );

  // Displays the retrieved user's profile, along with follower information and all of their posts.
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center my-6">
        <div className="bg-myDarkGrey text-myLightBlue p-4 rounded-3xl flex flex-col items-center w-4/5">
          <h2 className="text-4xl pb-2 underline underline-offset-4">
            {user.username}&apos;s profile
          </h2>
          <h4 className="text-3xl py-2">Bio</h4>
          <p className="text-white pb-5">{user.bio}</p>
          <p>{followerString}</p>
          {/* Allows you to follow/unfollow the current user  */}
          <FollowButton self={self} user={user} />
          {/* Tells you if this user follows you */}
          {followsYou && <p>{user.username} follows you</p>}
        </div>
      </div>
      {/* Display all posts made by this user */}
      <DisplayPosts
        postType="user"
        idType="clerk"
        id={clerkId}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
}
