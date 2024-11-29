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
  let clerkId = "";
  if (user) {
    clerkId = (await user).clerk_id;
  }

  if (!user) {
    notFound();
  }

  const self = await GetUser("self");
  let isOwnProfile = false;

  if (self) {
    isOwnProfile = user.clerk_id === self.clerk_id;
  } else {
    redirect("/");
  }
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
    <div className="flex flex-col">
      <div className="flex flex-col items-center my-6">
        <div className="bg-myDarkGrey text-myLightBlue p-4 rounded-3xl flex flex-col items-center w-4/5">
          <h2 className="text-4xl pb-2 underline underline-offset-4">
            {user.username}&apos;s profile
          </h2>
          <h4 className="text-3xl py-2">Bio</h4>
          <p className="text-white pb-5">{user.bio}</p>
          <p>{followerString}</p>
          <FollowButton self={self} user={user} />
          {followsYou && <p>{user.username} follows you</p>}
        </div>
      </div>
      <DisplayPosts
        postType="user"
        idType="clerk"
        id={clerkId}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
}
