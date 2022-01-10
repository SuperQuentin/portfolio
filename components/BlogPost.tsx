import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

export default function BlogPost() {
  return (
    <Link href={"/"}>
      <a
        className={clsx(
          "group relative rounded-3xl bg-slate-300 space-y-2 p-4 pt-72"
        )}
      >
        <div
          className={clsx(
            "group-hover:text-orange-400 font-bold text-2xl px-2"
          )}
        >
          Titre
        </div>
        <div className={clsx("px-2")}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
          architecto ipsa quas repellat harum aliquam tempore et amet eum earum,
          fugit quidem autem quasi hic vel voluptatum placeat doloribus. Fugit!
        </div>
        <Image
          className={clsx(
            "absolute w-full h-full object-cover inset-0 opacity-80 rounded-3xl"
          )}
          src={"/giphy.gif"}
          alt={"article"}
        />
      </a>
    </Link>
  );
}
