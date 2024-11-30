import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

// Nav bar to display page links, site header and login/user button. Right side display changes depending on whether user is logged in
export default function Nav() {
  return (
    <nav className="text-myLightBlue bg-myBlack shadow-lg shadow-myDarkGrey grid grid-cols-3 gap-3 text-4xl items-center">
      <div className="flex justify-evenly">
        <Link href="/" className="hover:text-myDarkBlue hover:underline">
          Home
        </Link>
        <Link className="hover:text-myDarkBlue hover:underline" href="/posts">
          Posts
        </Link>
      </div>
      <div className="flex justify-center">
        <h1 className="text-6xl py-4">Social Media</h1>
      </div>
      <div className="flex justify-evenly">
        <SignedOut>
          <Link
            href="/sign-up"
            className="hover:text-myDarkBlue hover:underline"
          >
            Sign in/up
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href="/user" className="hover:text-myDarkBlue hover:underline">
            User
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
