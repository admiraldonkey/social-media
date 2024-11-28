import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GetUser(idType, id) {
  let modifier = "";
  switch (idType) {
    case "clerk":
      const { userId } = await auth();
      modifier = ` clerk_id = '${userId}'`;
      break;
    case "user":
      modifier = ` id = ${id}`;
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
      modifier = ` WHERE clerk_id = '${id}'`;
      break;
  }
  const response = await db.query(`SELECT * FROM posts${modifier}`);
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
