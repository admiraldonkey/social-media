import { GetUser } from "@/components/GetData";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default async function HomePage() {
  const user = await GetUser("self");
  let username = "";
  if (user) {
    username = user.username;
  }

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
