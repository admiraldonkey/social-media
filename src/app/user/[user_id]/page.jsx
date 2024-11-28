import { GetUser } from "@/components/GetData";
import { notFound, redirect } from "next/navigation";

export default async function IndividualUserPage({ params }) {
  const userId = (await params).user_id;
  const user = await GetUser("user", userId);
  const clerkUser = await GetUser("clerk");
  const isOwnProfile = user.clerk_id === clerkUser.clerk_id;

  if (!user) {
    notFound();
  } else if (isOwnProfile) {
    redirect("/user");
  }

  return (
    <div>
      <h2>{user.username}&apos;s user profile</h2>
      <h2>{user.username}&apos;s bio</h2>
      <p>{user.bio}</p>
    </div>
  );
}
