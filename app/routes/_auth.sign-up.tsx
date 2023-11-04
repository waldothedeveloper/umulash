import { SignUp } from "@clerk/remix";
export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: "z-0",
          formButtonPrimary: "bg-yellow-400 hover:bg-yellow-500",
        },
      }}
    />
  );
}
