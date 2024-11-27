import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Sorry, the specified user could not be found.</p>
      <Link href="/">Return to the homepage</Link>
    </div>
  );
}
