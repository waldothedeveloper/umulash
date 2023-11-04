import { SignUp } from "@clerk/remix";

export default function SignUpPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <SignUp />
    </div>
  );
}