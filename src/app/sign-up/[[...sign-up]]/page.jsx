import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-myDarkGrey">
      <SignUp />
    </div>
  );
}
