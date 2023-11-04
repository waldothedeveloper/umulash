import { Outlet } from "@remix-run/react";
import NavBar from "~/components/navbar";

export default function Auth() {
  return (
    <>
      <NavBar />
      <div className="h-screen w-full flex items-center justify-center overflow-hidden -z-10">
        <Outlet />
      </div>
    </>
  );
}
