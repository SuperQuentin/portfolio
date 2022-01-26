import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useRouter } from "next/router";
import Image from "next/image";
import { ReactElement } from "react";
import clsx from "clsx";

const { Client } = require("@notionhq/client");

const Post = ({ content }: any) => {
  const router = useRouter();
  const { id } = router.query; // get id from query string

  return (
    <div className={clsx("relative w-full h-screen -mt-20")}>
      <div className={clsx("max-w-7xl m-auto h-full")}>
        <div className={clsx("flex justify-center items-center h-full")}>
          <h2 className={clsx("text-7xl text-white font-bold")}>Post : {id}</h2>
          ;
        </div>
      </div>
      <div
        className={clsx("absolute w-full h-full object-cover inset-0 z-[-10]")}
      >
        <Image
          layout={"fill"}
          objectFit={"cover"}
          src={"/marcel-strauss-7DigijJqGlo-unsplash.jpg"}
          alt="background-image"
          priority={true}
        />
      </div>
    </div>
  );
};

Post.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Post;
