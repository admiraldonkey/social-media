import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-myDarkGrey">
      <SignIn />
    </div>
  );
}
