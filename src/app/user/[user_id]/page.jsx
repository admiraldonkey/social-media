import DisplayPosts from "@/components/DisplayPosts";
import FollowButton from "@/components/FollowButton";
import {
  GetFollowers,
  GetFollowersString,
  GetUser,
} from "@/components/GetData";
import { notFound, redirect } from "next/navigation";

export default async function IndividualUserPage({ params }) {
  const userId = (await params).user_id;
  const user = await GetUser("userId", userId);
  const clerkId = (await user).clerk_id;
  if (!user) {
    notFound();
  }

  const self = await GetUser("self");
  const isOwnProfile = user.clerk_id === self.clerk_id;
  if (isOwnProfile) {
    redirect("/user");
  }

  // const usersPosts = await GetPosts("clerk", user.clerk_id);
  const followedByYou = await GetFollowers("match", self.id, user.id);
  const followsYou = await GetFollowers("match", user.id, self.id);
  // const userFollowers = await GetFollowers("followers", user.id);

  const followerString = await GetFollowersString(
    "user",
    user.id,
    followedByYou
  );

  return (
    <div>
      <h2>{user.username}&apos;s user profile</h2>
      <h2>{user.username}&apos;s bio</h2>
      <p>{user.bio}</p>
      <p>{followerString}</p>
      <FollowButton self={self} user={user} />
      {followsYou && <p>{user.username} follows you</p>}
      <DisplayPosts
        postType="user"
        idType="clerk"
        id={clerkId}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
}
