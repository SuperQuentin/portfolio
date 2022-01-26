import clsx from "clsx";
import { motion } from "framer-motion";
import { SvgBlob } from "react-svg-blob";

type BlobProps = {
  title: string;
  content: string;
  position: number;
  variants: any;
  blob: any;
  right?: boolean;
};

export default function Blob({
  position,
  title,
  content,
  variants,
  right,
  blob,
}: BlobProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={variants}
      className={clsx(
        "flex md:justify-between items-center w-full",
        right ? "" : "md:flex-row-reverse"
      )}
    >
      <div className={"order-1 w-5/12 hidden md:block"}></div>
      <div
        className={
          "z-20  flex items-center order-1 bg-slate-800 shadow-xl w-8 h-8 rounded-full ml-4 md:ml-0"
        }
      >
        <h2 className="mx-auto font-semibold text-lg text-white">{position}</h2>
      </div>
      <div className="order-1 relative w-5/12 h-72 flex-grow md:flex-grow-0 text-white z-10">
        <div className="relative flex flex-col justify-center items-center h-full">
          {/** this is the blob, blob is your new friend */}
          <a href="#test" className="group p-16 rounded-3xl">
            {/** link to use it later on another page or in a modal */}
            <h3 className="mb-3 font-bold text-xl">{title}</h3>
            <p className="text-sm hidden md:block">{content}</p>
            <div className="absolute -z-10 inset-4 -mt-24 ml-8">
              {blob ? (
                blob
              ) : (
                <SvgBlob
                  variant="solid"
                  color="#00A65A"
                  shapeProps={{ edges: 6 }}
                  className={"w-full"}
                />
              )}
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
