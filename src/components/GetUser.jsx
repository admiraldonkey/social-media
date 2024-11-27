import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GetUserByClerk() {
  const { userId } = await auth();
  const userResponse = await db.query(
    `SELECT * FROM users WHERE clerk_id = '${userId}'`
  );
  const user = { rows: userResponse.rows, rowCount: userResponse.rowCount };

  return user;
}

export async function GetUserByUserId(userId) {
  const userResponse = await db.query(
    `SELECT * FROM users WHERE id = '${userId}'`
  );
  const user = { rows: userResponse.rows, rowCount: userResponse.rowCount };

  return user;
}
