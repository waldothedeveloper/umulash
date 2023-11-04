import type { MetaFunction } from "@remix-run/node";
import { UserButton } from "@clerk/remix";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main className="mt-12">

      <h1 className="text-slate-800 text-4xl font-bold">Welcome to Umulash</h1>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
