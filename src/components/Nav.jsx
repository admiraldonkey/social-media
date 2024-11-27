import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
      <SignedOut>
        <Link href="/sign-up">Sign in/up</Link>
      </SignedOut>
      <SignedIn>
        <Link href="/user">User</Link>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
