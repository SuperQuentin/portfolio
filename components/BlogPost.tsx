import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";

export type BlogPostProps = {
  id: string;
  title: string;
  icon?: Array<string>;
  description: string;
  cover: string;
  variants: any;
};

export default function BlogPost({
  id,
  title,
  icon,
  description,
  cover,
  variants,
}: BlogPostProps) {
  return (
    <Link href={"/blog/" + id}>
      <a
        className={clsx(
          "group h-full aspect-square relative rounded-3xl bg-transparent z-10 hover:scale-[.97] transition-all transform"
        )}
      >
        <motion.div variants={variants}>
          {/** use motion div to be animated in stagger by it's parent container */}
          <div
            className={clsx(
              "absolute h-full aspect-square -z-10 overflow-hidden rounded-3xl"
            )}
          >
            <Image
              layout={"fill"}
              objectFit={"cover"}
              src={cover ? cover : "/giphy.gif"}
              alt={"article"}
              priority={true}
            />
          </div>
          <div
            className={clsx(
              "flex flex-col h-full p-8 md:px-4 aspect-square md:pb-6 text-slate-300 group-hover:text-orange-400 ",
              "bg-gradient-to-t from-black  rounded-3xl"
            )}
          >
            <div className={clsx("flex-grow")}></div>
            {icon ? (
              icon[0] === "emoji" ? (
                <div className={clsx("text-4xl ml-2 mb-2")}>{icon[1]}</div>
              ) : icon[0] === "file" ? (
                <div className={clsx("text-4xl ml-2 mb-2")}>
                  <Image width={36} height={36} src={icon[1]} alt={"icon"} />
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <div className={clsx(" font-bold text-2xl px-2")}>{title}</div>
            <div className={clsx("px-2")}>
              {description ? description.slice(0, 200).concat("...") : ""}
            </div>
          </div>
        </motion.div>
      </a>
    </Link>
  );
}
