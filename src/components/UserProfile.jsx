import { GetUserByClerk } from "./GetUser";
import GetPosts from "./GetPosts";
import DisplayPosts from "./DisplayPosts";

export default async function UserProfile() {
  const user = (await GetUserByClerk()).rows[0];
  const posts = await GetPosts("clerk", user.clerk_id);
  return (
    <div>
      <div>
        <h2>My User Profile:</h2>
        <h4>Username: {user.username}</h4>
        <p>Bio: {user.bio}</p>
      </div>
      {posts ? (
        <DisplayPosts posts={posts} />
      ) : (
        <p>{user.username} has not yet posted anything!</p>
      )}
    </div>
  );
}
