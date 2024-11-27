import { db } from "@/lib/db";

export default async function GetPosts(idType, id) {
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
