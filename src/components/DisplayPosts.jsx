import { GetPosts, GetUser } from "./GetData";

export default async function DisplayPosts({
  postType,
  idType,
  id,
  isOwnProfile,
}) {
  let name = "";
  let fetchArg1 = "";
  let fetchArg2 = "";
  switch (postType) {
    case "all":
      break;
    case "own":
      fetchArg1 = "clerk";
      fetchArg2 = id;
      name = (await GetUser("self")).username;
      break;
    case "user":
      fetchArg1 = "clerk";
      fetchArg2 = id;
      if (idType == "clerk") {
        name = (await GetUser("userClerk", id)).username;
      } else {
        name = (await GetUser("userId", id)).username;
      }
  }
  // console.log(
  //   "post type is: " +
  //     postType +
  //     ", username is: " +
  //     name +
  //     ", userId is: " +
  //     id
  // );
  // console.log(fetchArg1, fetchArg2);
  const posts = await GetPosts(fetchArg1, fetchArg2);
  // console.log(posts);
  let heading = "";
  if (isOwnProfile) {
    if (!posts) {
      // heading = "You have not made any posts yet!";
      return <p>You have not made any posts yet!</p>;
    } else {
      heading = "Your posts";
    }
  } else {
    if (!posts) {
      return <p>{name} has not made any posts yet!</p>;
    } else {
      heading = `${posts[0].username}'s posts`;
    }
  }
  return (
    <div>
      {posts.length > 1 ? (
        <div>
          <h2>{heading}</h2>
          {posts.map((post) => {
            return (
              <div key={post.id}>
                {postType == "all" && <h3>Posted by: {post.username}</h3>}
                <p>{post.content}</p>
                {!post.likes && <p>No likes yet</p>}
                {post.likes == 1 && <p>Liked {post.likes} time</p>}
                {post.likes > 1 && <p>Liked {post.likes} times</p>}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h2>{heading}</h2>
          <div>{postType != "own" && <h3>Posted by: {posts.username}</h3>}</div>
          <p>{posts.content}</p>
          {!posts.likes && <p>No likes yet</p>}
          {posts.likes == 1 && <p>Liked {posts.likes} time</p>}
          {posts.likes > 1 && <p>Liked {posts.likes} times</p>}
        </div>
      )}
    </div>
  );
}

// export default async function DisplayPosts({ clerkId, isOwnProfile }) {
//   let modifier = "";
//   const posts = await GetPosts("clerk", clerkId);
//   console.log(posts);
//   if (isOwnProfile) {
//     modifier = "My ";
//   } else {

//   }

//   if (!posts) {
//     return <p>User has not made any posts yet</p>;
//   } else if (posts.length > 1) {
//     console.log("user has made multiple posts");
//     return (
//       <div>
//         <h2>My Posts</h2>
//         {posts.map((post) => {
//           return (
//             <div key={post.id}>
//               <p>Content: {post.content}</p>
//               <p>Likes: {post.likes}</p>
//             </div>
//           );
//         })}
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <h2>My Posts</h2>
//         <div>
//           <p>Content: {posts.content}</p>
//           <p>Likes: {posts.likes}</p>
//         </div>
//       </div>
//     );
//   }
// }
