import { ClerkApp, ClerkErrorBoundary } from "@clerk/remix";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";

import NavBar from "~/components/navbar";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import styles from "./tailwind.css";

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function App() {
  return (
    <Document>
      <NavBar />
      <Outlet />
    </Document>
  );
}

export default ClerkApp(App);
export const ErrorBoundary = ClerkErrorBoundary();
