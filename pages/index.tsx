import DefaultLayout from "../components/layouts/DefaultLayout";
import { ReactElement, useLayoutEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import BlogPost from "../components/BlogPost";

export default function Home() {
  return (
    <>
      <div className={clsx("relative w-full h-screen -mt-20")}>
        <div className={clsx("max-w-7xl m-auto pt-20")}>
          <div>
            <h1 id={"title"} className={clsx("text-5xl")}>
              Le beau titre
            </h1>
            <p className={clsx("text-xl")}>la belle description</p>
          </div>
        </div>
        <div className={clsx(
            "absolute w-screen h-screen object-cover inset-0 opacity-80 z-[-10]"
          )}>
            <Image layout={"fill"} objectFit={"cover"} src={"/giphy.gif"} alt="background-image" />
        </div>
      </div>
      <div className={clsx("min-h-screen")}>
        <div className={clsx("max-w-7xl h-full m-auto space-y-8 py-16 px-4")}>
          <div
            className={clsx(
              "text-3xl font-semibold border-b-4 border-red-500 max-w-fit pb-2"
            )}
          >
            Articles du blog
          </div>
          <div className={clsx("w-full flex flex-col p-4 space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4")}>
            <BlogPost />
            <BlogPost />
            <BlogPost />
          </div>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
