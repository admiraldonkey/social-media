import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GetUser(idType, id) {
  let modifier = "";
  switch (idType) {
    case "self":
      const { userId } = await auth();
      modifier = ` clerk_id = '${userId}'`;
      break;
    case "userId":
      modifier = ` id = ${id}`;
      break;
    case "userClerk":
      modifier = ` clerk_id = '${id}'`;
      break;
  }
  const userResponse = await db.query(`SELECT * FROM users WHERE${modifier}`);
  if (userResponse.rowCount == 1) {
    return userResponse.rows[0];
  } else {
    return null;
  }
}

export async function GetPosts(idType, id) {
  let modifier = "";
  switch (idType) {
    case "post":
      modifier = ` WHERE id = ${id}`;
      break;
    case "clerk":
      modifier = ` WHERE posts.clerk_id = '${id}'`;
      break;
  }
  const response = await db.query(
    `SELECT posts.id, posts.content, posts.likes, posts.clerk_id, users.username AS username FROM posts JOIN users ON posts.clerk_id = users.clerk_id${modifier}`
  );
  if (response.rowCount > 1) {
    const posts = response.rows;
    return posts;
  } else if (response.rowCount == 1) {
    const post = response.rows[0];
    return post;
  } else {
    return null;
  }
}

export async function GetFollowers(type, selfId, followeeId) {
  let modifier = "";
  let result = "";
  switch (type) {
    case "follows":
      modifier = `user_id = ${selfId}`;
      break;
    case "match":
      modifier = `user_id = ${selfId} AND follows = ${followeeId}`;
      break;
    case "followers":
      modifier = `follows = ${selfId}`;
  }

  switch (type) {
    case "followers":
      result = await db.query(
        `SELECT followers.user_id, followers.follows, users.username AS username FROM followers JOIN users ON followers.user_id = users.id WHERE ${modifier}`
      );
      break;
    default:
      result = await db.query(`SELECT * FROM followers WHERE ${modifier}`);
      break;
  }
  // const result = await db.query(`SELECT * FROM followers WHERE ${modifier}`);

  if (result.rowCount == 0) {
    return null;
  } else if (result.rowCount == 1) {
    return result.rows[0];
  } else {
    return result.rows;
  }
}

// Unnecessarily complicated string generator to show follower information on user profile
export async function GetFollowersString(userType, id, followedByYou) {
  const userFollowers = await GetFollowers("followers", id);
  const user = await GetUser("userId", id);
  const name = user.username;
  let modifier = "";
  let followerCount = 0;
  if (userFollowers) {
    if (userFollowers.user_id) {
      followerCount = 1;
    } else if (userFollowers.length > 0) {
      followerCount = userFollowers.length;
    }
  } else {
    followerCount = 0;
  }
  switch (userType) {
    case "self":
      if (!userFollowers) {
        modifier = `You don't have any followers yet.`;
      } else {
        modifier = `You are followed by ${followerCount} people.`;
      }
      break;
    case "user":
      if (!userFollowers) {
        modifier = `${name} has no followers yet.`;
      } else if (userFollowers) {
        if (followedByYou) {
          if (followerCount === 1) {
            modifier = `Followed by you.`;
          } else if (followerCount === 2) {
            modifier = `You and ${followerCount - 1} other follow ${name}.`;
          } else {
            modifier = `You and ${followerCount - 1} others follow ${name}.`;
          }
        } else {
          if (followerCount === 1) {
            modifier = `Followed by ${followerCount} user`;
          } else {
            modifier = `Followed by ${followerCount} users`;
          }
        }
      }
  }

  const followerString = `${modifier}`;
  return followerString;
}
