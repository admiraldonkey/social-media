import { GetPosts, GetUser } from "./GetData";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { SignedIn } from "@clerk/nextjs";

// Big, messy function attempting to handle all logic for various ways in which posts may want to be retrieved and displayed
export default async function DisplayPosts({
  postType,
  idType,
  id,
  isOwnProfile,
}) {
  // Initialise some variables so they can be used as modifiers or to hold useful information as necessary.
  // User name to display if desired
  let name = "";
  // Optional arguments to pass to the GetPosts function
  let fetchArg1 = "";
  let fetchArg2 = "";
  let followed = false;
  // This is used to define which path to use when performing a Redirect or RevalidatePath.
  let path = "";
  // Get own user data or set to null if not logged in
  const selfData = (await GetUser("self")) || "";

  // Alter variables or call functions as required depending on the 'postType' passed as an argument to this function
  switch (postType) {
    // Case for retrieving all posts and sets the path to reflect this, setting the sort method to all.
    case "all":
      path = "/posts?sort=all";
      break;
    // Case for retrieving all posts made by the current user and sets the path accordingly.
    case "own":
      fetchArg1 = "clerk";
      fetchArg2 = id;
      name = (await GetUser("self")).username;
      path = "/user";
      break;
    // Case for retrieving all posts made by a specific user (other than the logged in user)
    case "user":
      fetchArg1 = "clerk";
      fetchArg2 = id;
      // Make sure the correct user id type is used when retrieving their data.
      // Their username is set to the 'name' variable and the path is set to their dynamic route
      if (idType == "clerk") {
        const user = await GetUser("userClerk", id);
        name = user.username;
        path = `/user/${user.id}`;
      } else {
        const user = await GetUser("userId", id);
        name = user.username;
        path = `/user/${user.id}`;
      }
      break;
    // Case for retrieving all posts made by users that the currently logged in user follows
    case "followed":
      followed = true; //Add logic to get posts for each followed user
      fetchArg1 = "followers";
      fetchArg2 = (await GetUser("self")).id;
      path = "/posts?sort=followed";
      break;
  }

  // Fetches the specified posts and passes in the two modifier arguments as required
  const posts = await GetPosts(fetchArg1, fetchArg2);

  // Heading to display above posts if relevant
  let heading = "";

  // If not fetching all posts
  if (postType != "all") {
    // If user is viewing their own profile
    if (isOwnProfile) {
      // If the user is viewing their own profile but has not currently made any posts, return this message
      if (!posts) {
        return (
          <p className="flex justify-center">
            You have not made any posts yet!
          </p>
        );
        // If the user is viewing their own profile and has made posts, update heading variable
      } else {
        heading = "Your posts";
      }
      // If not user's own profile
    } else {
      // If no posts to display
      if (!posts) {
        // If viewing posts sorted by followed users, displays this is no followed users have made a post (or if user doesn't follow anyone)
        if (followed) {
          return (
            <div className="flex flex-col items-center">
              <p className="flex justify-center">Nothing to see here...</p>
            </div>
          );
          // If viewing a particular user's profile, displays this if they have not made any posts
        } else {
          return (
            <p className="flex justify-center">
              {name} has not made any posts yet!
            </p>
          );
        }
        // If there are posts to display for a specific user
        // Set the heading to show the their name. posts.username if there is only 1 post, otherwise retrieves from the name variable.
      } else {
        heading = `${posts.username || name}'s posts`;
      }
    }
  }
  // If returned posts contains more than one post then sort by ID to stop them reordering if record gets updated
  if (posts.length > 1) {
    await posts.sort((a, b) => a.id - b.id);
  }
  return (
    <div className="flex flex-col items-center">
      {/* Displays either the dynamic heading or the alternate h2 depending on if user requested posts by users they follow */}
      {followed ? <h2>Posts by people you follow</h2> : <h2>{heading}</h2>}
      {/* Please forgive me for this horrific tertiary...
      If posts contains more than one post, render via mapping method, else render by using dot notation directly on posts (line 183+) */}
      {posts.length > 1 ? (
        posts.map((post) => {
          return (
            <div
              key={post.id}
              className="w-5/6 bg-myBlack text-white even:bg-myDarkGrey my-5 odd:rounded-r-3xl even:rounded-l-3xl px-10 py-5 last:mb-20"
            >
              <div className="flex justify-between">
                <p className="pb-1">{post.content}</p>
                {/* If user is signed in, display a like button if the post was not made by said user */}
                <SignedIn>
                  {post.clerk_id != selfData.clerk_id && (
                    <LikeButton
                      postId={post.id}
                      likes={post.likes}
                      path={path}
                    />
                  )}
                </SignedIn>
              </div>
              <div className="flex justify-between text-myDarkBlue">
                {/* If user is viewing all posts or filtered by users they follow, adds a 'posted by' field on the post, along with a link to the poster's user profile */}
                {postType == "all" && (
                  <h3>
                    Posted by:{" "}
                    <Link
                      href={`../user/${post.user_id}`}
                      className="text-myLightBlue hover:underline hover:font-semibold"
                    >
                      {post.username}
                    </Link>
                  </h3>
                )}
                {followed && (
                  <h3>
                    Posted by:{" "}
                    <Link
                      href={`../user/${post.user_id}`}
                      className="text-myLightBlue hover:underline hover:font-semibold"
                    >
                      {post.username}
                    </Link>
                  </h3>
                )}
                {/* Dynamically renders message depending on number of likes a post has */}
                {!post.likes && <p>No likes yet</p>}
                {post.likes == 1 && (
                  <p>
                    Liked <span className="text-myLightBlue">{post.likes}</span>{" "}
                    time
                  </p>
                )}
                {post.likes > 1 && (
                  <p>
                    Liked <span className="text-myLightBlue">{post.likes}</span>{" "}
                    times
                  </p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        // This runs if there is only one post in posts
        <div className="w-5/6 bg-myBlack text-white even:bg-myDarkGrey my-5 odd:rounded-r-3xl even:rounded-l-3xl px-10 py-5 last:mb-20">
          <div className="flex justify-between">
            <p className="pb-1">{posts.content}</p>
            {/* If user is signed in, display a like button if the post was not made by said user */}
            <SignedIn>
              {posts.clerk_id != selfData.clerk_id && (
                <LikeButton postId={posts.id} likes={posts.likes} path={path} />
              )}
            </SignedIn>
          </div>
          <div className="flex justify-between text-myDarkBlue">
            {/* If user is viewing all posts or filtered by users they follow, adds a 'posted by' field on the post, along with a link to the poster's user profile */}
            {postType == "all" && (
              <h3>
                Posted by:{" "}
                <Link
                  href={`../user/${posts.user_id}`}
                  className="text-myLightBlue hover:underline hover:font-semibold"
                >
                  {posts.username}
                </Link>
              </h3>
            )}
            {followed && (
              <h3>
                Posted by:{" "}
                <Link
                  href={`../user/${posts.user_id}`}
                  className="text-myLightBlue hover:underline hover:font-semibold"
                >
                  {posts.username}
                </Link>
              </h3>
            )}
            {/* Dynamically renders message depending on number of likes a post has */}
            {!posts.likes && <p>No likes yet</p>}
            {posts.likes == 1 && (
              <p>
                Liked <span className="text-myLightBlue">{posts.likes}</span>{" "}
                time
              </p>
            )}
            {posts.likes > 1 && (
              <p>
                Liked <span className="text-myLightBlue">{posts.likes}</span>{" "}
                times
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
