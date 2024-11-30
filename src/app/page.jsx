import { GetUser } from "@/components/GetData";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default async function HomePage() {
  // Check if user is signed in, get their username if so
  const user = await GetUser("self");
  let username = "";
  if (user) {
    username = user.username;
  }

  // If signed out, display message encouraging user to sign up or sign in. Otherwise, displays personalised message.
  return (
    <div className="flex justify-center h-full items-center text-6xl bg-myDarkGrey text-white">
      <SignedOut>
        <h2>
          <Link
            href="/sign-in"
            className="text-myLightBlue hover:text-myDarkBlue hover:underline underline-offset-8"
          >
            Sign In
          </Link>{" "}
          or{" "}
          <Link
            href="/sign-up"
            className="text-myLightBlue hover:text-myDarkBlue hover:underline underline-offset-8"
          >
            Create
          </Link>{" "}
          a new profile to get started!
        </h2>
      </SignedOut>
      <SignedIn>
        <h2>Welcome back, {username}!</h2>
      </SignedIn>
    </div>
  );
}
