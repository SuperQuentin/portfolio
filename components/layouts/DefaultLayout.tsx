import { ReactNode } from "react";
import Head from "next/head";
import Navbar from "../Navbar";
import Footer from "../Footer";
import clsx from "clsx";

type DefaultLayoutProps = {
  children: ReactNode;
};

// Default layout use by each page components

// eslint-disable-next-line react/display-name
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <main className={clsx("w-full min-h-screen")}>{children}</main>
      <Footer />
    </>
  );
}
