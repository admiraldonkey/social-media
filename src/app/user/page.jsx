import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserForm from "@/components/UserForm";
import UserProfile from "@/components/UserProfile";
import { GetUser } from "@/components/GetData";

export default async function UserPage() {
  const user = GetUser("clerk");

  return (
    <div>
      <SignedIn>{user ? <UserProfile /> : <UserForm />}</SignedIn>
      <SignedOut>
        <p>You need to sign in fam</p>
      </SignedOut>
    </div>
  );
}
