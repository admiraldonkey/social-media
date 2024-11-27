import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h2>
        <Link href="/sign-in">Sign In</Link> or{" "}
        <Link href="/sign-up">Create A New Profile</Link> to get started!
      </h2>
    </div>
  );
}
