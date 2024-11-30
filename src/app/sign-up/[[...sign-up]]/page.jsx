import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  // Displays clerk signup component. New user sign up redirects to user page so they can add their profile details.
  return (
    <div className="h-full flex flex-col justify-center items-center bg-myDarkGrey">
      <SignUp />
    </div>
  );
}
