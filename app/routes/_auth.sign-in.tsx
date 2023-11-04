import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: "z-0",
          formButtonPrimary: "bg-yellow-400 hover:bg-yellow-500",
        },
      }}
    />
  );
}
