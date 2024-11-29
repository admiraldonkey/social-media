import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

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
        <h1 className="text-6xl py-4">Social Meady-Yarr</h1>
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
