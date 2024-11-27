import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div>
      <SignUp />
      <h2>
        Already signed up? <Link href="/sign-in">Sign In</Link> instead.
      </h2>
    </div>
  );
}
