import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// Function that retrieves user data from databse.
export async function GetUser(idType, id) {
  let modifier = "";
  // Changes modifier for query string depending on what idType was passed as an argument
  switch (idType) {
    // Case for fetching current logged in user. Gets their id via the auth method and adds to modifier
    case "self":
      const { userId } = await auth();
      modifier = ` clerk_id = '${userId}'`;
      break;
    // If user needs to be retrieved by their user id (primary key of user's table)
    case "userId":
      modifier = ` id = ${id}`;
      break;
    // If user needs to be retrieved by their clark ID
    case "userClerk":
      modifier = ` clerk_id = '${id}'`;
      break;
  }
  // Retrieves the requested user data from the users database, amending the query string with the modifer as necessary
  const userResponse = await db.query(`SELECT * FROM users WHERE${modifier}`);
  // Return the retrieved record if it exists, else return null
  if (userResponse.rowCount == 1) {
    return userResponse.rows[0];
  } else {
    return null;
  }
}

// Function that retrieves posts from the database
export async function GetPosts(idType, id) {
  // Sets the default query string, fetching data from posts and appending extra information from the users table
  let modifier = `SELECT 
      posts.id, 
      posts.content, 
      posts.likes, 
      posts.clerk_id, 
      users.username AS username, 
      users.id as user_id 
    FROM posts 
    JOIN users ON posts.clerk_id = users.clerk_id`;
  // Depending on the optional idType passed as an argument
  switch (idType) {
    // Case for getting post by specific post ID
    case "post":
      modifier = modifier + ` WHERE id = ${id}`;
      break;
    // Case for getting all posts made by a user, using their clerk id
    case "clerk":
      modifier = modifier + ` WHERE posts.clerk_id = '${id}'`;
      break;
    // Case for getting all posts made by people the current logged in user follows. Followers table references user primary keys. This finds every instance of the logged in user's id appearing as a follower in the table, then for each person in the corrosponding column it fetches their clerk_id which is used to retrieve all of their posts.
    case "followers":
      modifier = `
      SELECT 
        followers.user_id AS myid, 
        followers.follows, 
        posts.id AS id, 
        posts.content, 
        posts.likes, 
        posts.clerk_id, 
        users.username AS username, 
        users.clerk_id AS follow_clerk, 
        users.id as user_id 
      FROM followers
      INNER JOIN users ON followers.follows = users.id
      INNER JOIN posts ON users.clerk_id = posts.clerk_id
      WHERE followers.user_id = ${id}`;
      break;
  }

  // If db response contains multiple posts, return the rows of the reponse. If there is only one post, return that row (accessed by index). If no posts were retrieved, return null.
  const response = await db.query(modifier);
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

// Function that retrieves follower data from the database
export async function GetFollowers(type, selfId, followeeId) {
  let modifier = "";
  let result = "";
  switch (type) {
    // Case for retrieving list of people the logged in user follwos
    case "follows":
      modifier = `user_id = ${selfId}`;
      break;
    // Case for checking if a user follows the current logged in user
    case "match":
      modifier = `user_id = ${selfId} AND follows = ${followeeId}`;
      break;
    // Case for retrieving list of people that follow the logged in user
    case "followers":
      modifier = `follows = ${selfId}`;
  }

  switch (type) {
    // Run this query if fetching list of people that follow logged in user
    case "followers":
      result = await db.query(
        `SELECT followers.user_id, followers.follows, users.username AS username FROM followers JOIN users ON followers.user_id = users.id WHERE ${modifier}`
      );
      break;
    // Otherwise, run this query with the modified string appended
    default:
      result = await db.query(`SELECT * FROM followers WHERE ${modifier}`);
      break;
  }

  // If db response contains multiple rows, return them. If there is only one row, return it (accessed by index). If no rows were retrieved, return null.
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
  // Retrieve followers of specified user
  const userFollowers = await GetFollowers("followers", id);
  // Retrieve data of specified user
  const user = await GetUser("userId", id);
  const name = user.username;
  let modifier = "";
  let followerCount = 0;

  // If specified user has followers
  if (userFollowers) {
    // If user only has 1 follower (and so accessible directly via dot notation) then set followerCount to 1
    if (userFollowers.user_id) {
      followerCount = 1;
      // If user has more than 1 follower, set the followerCount to be equal to the length of userFollowers.
    } else if (userFollowers.length > 0) {
      followerCount = userFollowers.length;
    }
  } else {
    followerCount = 0;
  }

  // Dynamically sets the modifier string depending on arguments passed to function
  switch (userType) {
    // Case for displaying follower information for current logged in user
    case "self":
      if (!userFollowers) {
        modifier = `You don't have any followers yet.`;
      } else {
        modifier = `You are followed by ${followerCount} people.`;
      }
      break;
    // Case for displaying follower information of a specific user
    case "user":
      // If user has no followers
      if (!userFollowers) {
        modifier = `${name} has no followers yet.`;
      } else if (userFollowers) {
        // If current logged in user follow them
        if (followedByYou) {
          // Sets appropriate value depending on whether people other than logged in user follows them
          if (followerCount === 1) {
            modifier = `Followed by you.`;
            // Gramatically correct value depending on if user has 1 or more follower in addition to logged in user
          } else if (followerCount === 2) {
            modifier = `You and ${followerCount - 1} other follow ${name}.`;
          } else {
            modifier = `You and ${followerCount - 1} others follow ${name}.`;
          }
          // If current logged in user does not follow them
        } else {
          // Gramatically correct value depending on if user has 1 or more follower
          if (followerCount === 1) {
            modifier = `Followed by ${followerCount} user`;
          } else {
            modifier = `Followed by ${followerCount} users`;
          }
        }
      }
  }
  // Return the dynamically generated string
  const followerString = `${modifier}`;
  return followerString;
}
