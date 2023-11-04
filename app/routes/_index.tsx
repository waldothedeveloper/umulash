import type { MetaFunction } from "@remix-run/node";
import Footer from "~/components/footer";
import NavBar from "~/components/navbar";
import Products from "~/components/products";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <NavBar />
      <main>
        <Products />
      </main>
      <Footer />
    </>
  );
}
