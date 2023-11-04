import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <SignIn />
    </div>
  );
}