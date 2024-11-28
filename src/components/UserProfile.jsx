import { GetUser, GetFollowersString } from "./GetData";
import DisplayPosts from "./DisplayPosts";
import { ViewFollowerButton } from "./ViewFollowerButton";
import DisplayFollowers from "./DisplayFollowers";

export default async function UserProfile() {
  const user = await GetUser("self");
  // const posts = await GetPosts("clerk", user.clerk_id);
  const followerString = await GetFollowersString("self", user.id);
  return (
    <div>
      <div>
        <h2>My User Profile:</h2>
        <h4>Username: {user.username}</h4>
        <p>Bio: {user.bio}</p>
        <p>{followerString}</p>
        <ViewFollowerButton>
          <DisplayFollowers />
        </ViewFollowerButton>
      </div>
      <DisplayPosts
        postType="own"
        idType="clerk"
        id={user.clerk_id}
        isOwnProfile={true}
      />
    </div>
  );
}
