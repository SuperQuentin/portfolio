import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

export type BlogPostProps = {
  id: string;
  title: string;
  icon?: {
    type: string,
    content: any,
  };
  description: string;
  cover: string;
}

export default function BlogPost({ id, title, icon, description, cover }: BlogPostProps) {
  return (
    <Link href={"/blog/" + id}>
      <a
        className={clsx(
          "group relative rounded-3xl bg-transparent z-10 space-y-2 hover:scale-[.97] transition-all transform"
        )}
      >
        <div className={clsx("absolute w-full h-full -z-10 overflow-hidden rounded-3xl")}>
          <Image
            layout={"fill"}
            objectFit={"cover"}
            src={cover ? cover : '/giphy.gif'}
            alt={"article"}
          /> 
        </div>
        <div className={clsx("flex flex-col h-full p-8 md:px-4 md:pb-4 pt-72 text-slate-300 group-hover:text-orange-400 ", "bg-gradient-to-t from-black  rounded-3xl")}>
         {
           icon ? (
            icon.type === 'emoji' ? (
              <div className={clsx("text-4xl ml-2 mb-2")}>
                {icon}
              </div>
            ) : icon.type === 'file' ? (
              <div className={clsx("text-4xl ml-2 mb-2 w-4 h-4")}>
                <Image 
                  layout={"fill"}
                  objectFit={"cover"}
                  src={icon.content}
                  alt={"icon"}
                />
              </div>
            ) : ''

           ) : ''
         }
          <div className={clsx(
              " font-bold text-2xl px-2"
            )}
          >
            { title }
          </div>
          <div className={clsx("px-2")}>
           { description ? description.slice(0, 200).concat('...') : '' }
          </div>
        </div>
        
      </a>
        
    </Link>
  );
}
