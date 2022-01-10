import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

export default function BlogPost() {
  return (
    <Link href={"/"}>
      <a
        className={clsx(
          "group relative rounded-3xl bg-transparent z-10 space-y-2 hover:scale-[.97] transition-all transform"
        )}
      >
        <div className={clsx("absolute w-full h-full -z-10 overflow-hidden rounded-3xl")}>
          <Image
            layout={"fill"}
            objectFit={"cover"}
            src={"/giphy.gif"}
            alt={"article"}
          /> 
        </div>
        <div className={clsx("flex flex-col h-full p-8 md:px-4 md:pb-4 pt-72   text-slate-300 group-hover:text-orange-400 ", "bg-gradient-to-t from-black  rounded-3xl")}>
          <div className={clsx(
              " font-bold text-2xl px-2"
            )}
          >
            Titre
          </div>
          <div className={clsx("px-2")}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            architecto ipsa quas repellat harum aliquam tempore et amet eum earum,
            fugit quidem autem quasi hic vel voluptatum placeat doloribus. Fugit!
          </div>
        </div>
        
      </a>
        
    </Link>
  );
}
