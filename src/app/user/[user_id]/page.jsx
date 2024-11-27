import { GetUserByUserId } from "@/components/GetUser";
import { notFound } from "next/navigation";

export default async function IndividualUserPage({ params }) {
  const userId = (await params).user_id;
  const userData = await GetUserByUserId(userId);
  const user = userData.rows[0];
  if (userData.rowCount != 1) {
    notFound();
  }

  return (
    <div>
      <h2>{user.username}&apos;s user profile</h2>
      <h2>{user.username}&apos;s bio</h2>
      <p>{user.bio}</p>
    </div>
  );
}
