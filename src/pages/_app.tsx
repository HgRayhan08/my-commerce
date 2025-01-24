import Navbar from "@/components/layouts/navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { sesion, ...pageProps },
}: AppProps) {
  // return <Component {...pageProps} />;
  return (
    <SessionProvider session={sesion}>
      <div>
        <Navbar></Navbar>
        <Component {...pageProps} />;
      </div>
    </SessionProvider>
  );
}
