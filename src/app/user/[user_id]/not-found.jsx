import Link from "next/link";

export default function NotFound() {
  // User gets redirected to this page if they try to visit a dynamic user route for a user that does not exist
  return (
    <div className="h-full flex flex-col justify-center items-center bg-myDarkGrey text-white">
      <h2 className="text-4xl font-semibold">Not Found</h2>
      <p className="text-3xl py-4">
        Sorry, the specified user could not be found.
      </p>
      <Link href="/" className="text-myLightBlue">
        Return to the homepage
      </Link>
    </div>
  );
}
