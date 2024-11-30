import { GetUser, GetFollowersString } from "./GetData";
import DisplayPosts from "./DisplayPosts";
import { ViewFollowerButton } from "./ViewFollowerButton";
import DisplayFollowers from "./DisplayFollowers";

// Display the profile of the currently logged in user
export default async function UserProfile() {
  // Get user's details from database
  const user = await GetUser("self");
  // Dynamically generate a string to tell user how many followers they have
  const followerString = await GetFollowersString("self", user.id);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center my-6">
        <div className="bg-myDarkGrey text-myLightBlue p-4 rounded-3xl flex flex-col items-center w-4/5">
          <h2 className="text-4xl pb-2 underline underline-offset-4">
            My Profile
          </h2>
          <h4 className="text-3xl py-2">Display Name</h4>
          <p className="text-white pb-5">{user.username}</p>
          <h4 className="text-3xl pb-2">Bio</h4>
          <p className="text-white pb-5">{user.bio}</p>
          <div className="flex flex-col items-center">
            <p>{followerString}</p>
            {/* Renders a client component button which allows user to show or hide a list of their followers. */}
            <ViewFollowerButton>
              {/* Displays a list of all followers */}
              <DisplayFollowers />
            </ViewFollowerButton>
          </div>
        </div>
      </div>
      {/* Displays all posts made by user */}
      <DisplayPosts
        postType="own"
        idType="clerk"
        id={user.clerk_id}
        isOwnProfile={true}
      />
    </div>
  );
}
