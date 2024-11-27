import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserForm from "@/components/UserForm";
import UserProfile from "@/components/UserProfile";
import { GetUserByClerk } from "@/components/GetUser";

export default async function UserPage() {
  const numUsers = (await GetUserByClerk()).rowCount;

  return (
    <div>
      <SignedIn>{numUsers === 1 ? <UserProfile /> : <UserForm />}</SignedIn>
      <SignedOut>
        <p>You need to sign in fam</p>
      </SignedOut>
    </div>
  );
}
