import { GetPosts, GetUser } from "./GetData";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { SignedIn } from "@clerk/nextjs";

export default async function DisplayPosts({
  postType,
  idType,
  id,
  isOwnProfile,
}) {
  let name = "";
  let fetchArg1 = "";
  let fetchArg2 = "";
  let followed = false;
  let path = "";
  const selfData = (await GetUser("self")) || "";
  switch (postType) {
    case "all":
      path = "/posts?sort=all";
      break;
    case "own":
      fetchArg1 = "clerk";
      fetchArg2 = id;
      name = (await GetUser("self")).username;
      path = "/user";
      break;
    case "user":
      fetchArg1 = "clerk";
      fetchArg2 = id;
      if (idType == "clerk") {
        const user = await GetUser("userClerk", id);
        name = user.username;
        path = `/user/${user.id}`;
      } else {
        // name = (await GetUser("userId", id)).username;
        const user = await GetUser("userId", id);
        name = user.username;
        path = `/user/${user.id}`;
      }
      break;
    case "followed":
      followed = true; //Add logic to get posts for each followed user
      fetchArg1 = "followers";
      fetchArg2 = (await GetUser("self")).id;
      path = "/posts?sort=followed";
      break;
  }
  console.log(
    "post type is: " +
      postType +
      ", username is: " +
      name +
      ", userId is: " +
      id
  );
  console.log(fetchArg1, fetchArg2);
  // console.log(followed);
  const posts = await GetPosts(fetchArg1, fetchArg2);
  // console.log(posts);
  let heading = "";
  if (postType != "all") {
    if (isOwnProfile) {
      if (!posts) {
        return (
          <p className="flex justify-center">
            You have not made any posts yet!
          </p>
        );
      } else {
        heading = "Your posts";
      }
    } else {
      if (!posts) {
        if (followed) {
          return (
            <div className="flex flex-col items-center">
              <p className="flex justify-center">Nothing to see here...</p>
            </div>
          );
        } else {
          return (
            <p className="flex justify-center">
              {name} has not made any posts yet!
            </p>
          );
        }
      } else {
        heading = `${posts.username || name}'s posts`;
      }
    }
  }
  if (posts.length > 1) {
    await posts.sort((a, b) => a.id - b.id);
  }
  return (
    <div className="flex flex-col items-center">
      {followed ? <h2>Posts by people you follow</h2> : <h2>{heading}</h2>}
      {posts.length > 1 ? (
        posts.map((post) => {
          return (
            <div
              key={post.id}
              className="w-5/6 bg-myBlack text-white even:bg-myDarkGrey my-5 odd:rounded-r-3xl even:rounded-l-3xl px-10 py-5 last:mb-20"
            >
              <div className="flex justify-between">
                <p className="pb-1">{post.content}</p>
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
        <div className="w-5/6 bg-myBlack text-white even:bg-myDarkGrey my-5 odd:rounded-r-3xl even:rounded-l-3xl px-10 py-5 last:mb-20">
          <div className="flex justify-between">
            <p className="pb-1">{posts.content}</p>
            <SignedIn>
              {posts.clerk_id != selfData.clerk_id && (
                <LikeButton postId={posts.id} likes={posts.likes} path={path} />
              )}
            </SignedIn>
          </div>
          <div className="flex justify-between text-myDarkBlue">
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
