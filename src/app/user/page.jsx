import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserForm from "@/components/UserForm";
import UserProfile from "@/components/UserProfile";
import { GetUser } from "@/components/GetData";

export default async function UserPage() {
  const user = await GetUser("self");
  return (
    <div>
      <SignedIn>{user ? <UserProfile /> : <UserForm />}</SignedIn>
      <SignedOut>
        <div className="h-full flex justify-center">
          <p className="text-4xl mt-20">
            And how exactly do you expect me to fetch your profile if
            you&apos;re not logged in? Off you go...
          </p>
        </div>
      </SignedOut>
    </div>
  );
}
