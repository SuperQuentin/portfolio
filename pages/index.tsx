import DefaultLayout from "../components/layouts/DefaultLayout";
import { ReactElement, useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import BlogPost from "../components/BlogPost";
import { BlogPostProps } from "../components/BlogPost";
import Link from "next/link";
import { motion, useViewportScroll } from "framer-motion";

import { SvgBlob } from "react-svg-blob";

const { Client } = require("@notionhq/client");

const msgWelcome = "Bienvenu sur mon portfolio";
export default function Home({
  blogPosts,
}: {
  blogPosts: Array<BlogPostProps>;
}) {
  return (
    <>
      <div className={"snap-mandatory snap-y"}>
        <div className={clsx("snap-start relative w-full h-screen -mt-20")}>
          <div className={clsx("max-w-7xl m-auto h-full pt-20")}>
            <div className={clsx("flex justify-center items-center h-full")}>
              <div className={clsx("flex flex-col text-white")}>
                <motion.h1
                  id={"title"}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 1 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 0.5,
                        staggerChildren: 0.08,
                      },
                    },
                  }}
                  className={clsx("text-7xl font-bold ")}
                >
                  {msgWelcome.split("").map((char, index) => {
                    return (
                      <motion.span
                        key={char + "-" + index}
                        variants={{
                          hidden: { visibility: "hidden", x: 32 },
                          visible: {
                            visibility: "initial",
                            x: 0,
                          },
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </motion.h1>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "absolute w-full h-full object-cover inset-0 opacity-80 z-[-10]"
            )}
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

        <div
          className={clsx(
            "snap-start max-w-7xl h-full m-auto space-y-8 py-16 px-4"
          )}
        >
          <div
            className={clsx(
              "text-3xl font-semibold border-b-4 border-red-500 max-w-fit pb-2 ml-4"
            )}
          >
            Articles du blog
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: {
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.15,
                },
              },
              hidden: {
                opacity: 0,
                transition: {
                  when: "afterChildren",
                },
              },
            }}
          >
            <div
              className={clsx(
                "w-full flex flex-col p-4 space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4"
              )}
            >
              {blogPosts.map((post) => {
                const blogPost = {};
                const page = post.child_page.page;
                blogPost.id = page.id;
                blogPost.title = page.properties.title.title[0].text.content;
                blogPost.cover = page.cover[page.cover.type].url;

                blogPost.icon = [];

                if ("file" in page.icon) {
                  blogPost.icon.push("file");
                  blogPost.icon.push(page.icon.file.url);
                }
                if ("emoji" in page.icon) {
                  blogPost.icon.push("emoji");
                  blogPost.icon.push(page.icon.emoji);
                }

                blogPost.description = post.child_page.content.results.find(
                  (block: any, index: number, array: Array<object>) => {
                    return (
                      block.type === "paragraph" &&
                      array[index - 1].type === "heading_1" &&
                      array[
                        index - 1
                      ].heading_1.text[0].text.content.toLowerCase() ===
                        "introduction"
                    );
                  }
                ).paragraph.text[0].text.content;

                return (
                  <BlogPost
                    key={blogPost.title}
                    id={blogPost.id}
                    title={blogPost.title}
                    description={blogPost.description}
                    icon={blogPost.icon}
                    cover={blogPost.cover}
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: -8 },
                    }}
                  />
                );
              })}
            </div>
            {blogPosts !== undefined ? (
              <motion.div
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: -8 },
                }}
                className={clsx("flex justify-center")}
              >
                <Link href={"/blog"}>
                  <a
                    className={clsx(
                      "p-4 text-xl font-bold hover:text-orange-400"
                    )}
                  >
                    Voir plus
                  </a>
                </Link>
              </motion.div>
            ) : (
              ""
            )}
          </motion.div>
        </div>

        <div className={clsx("snap-start min-h-screen")}>
          <div className={"max-w-7xl h-full m-auto space-y-8 py-16 px-4"}>
            <div
              className={clsx(
                "text-3xl font-semibold border-b-4 border-blue-500 max-w-fit pb-2 ml-4"
              )}
            >
              Parcours
            </div>
            <div className={clsx("mx-auto w-full h-full")}>
              <div
                className={
                  "border-2-2 absolute border-opacity-20 border-gray-700 border h-full left-8 md:left-1/2"
                }
              ></div>

              {/** left timeline item */}
              <div
                className={
                  "flex md:flex-row-reverse md:justify-between items-center w-full"
                }
              >
                <div className={"order-1 w-5/12 hidden md:block"}></div>
                <div
                  className={
                    "z-20  flex items-center order-1 bg-slate-800 shadow-xl w-8 h-8 rounded-full"
                  }
                >
                  <h2 className="mx-auto font-semibold text-lg text-white">
                    1
                  </h2>
                </div>
                <div className="order-1 relative w-5/12 flex-grow md:flex-grow-0 text-white z-10">
                  <div className="absolute inset-y-16 inset-x-24 flex flex-col justify-center items-center">
                    <h3 className="mb-3 font-bold  text-xl">Apprentisage</h3>
                    <p className="text-sm hidden md:block">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                  <SvgBlob
                    variant="solid"
                    color="#00A65A"
                    shapeProps={{ edges: 6 }}
                    className={"-z-10 w-full"}
                  />
                </div>
              </div>

              {/** right timeline item */}
              <div className={"flex md:justify-between items-center w-full"}>
                <div className={"order-1 w-5/12 hidden md:block"}></div>
                <div
                  className={
                    "z-20  flex items-center order-1 bg-slate-800 shadow-xl w-8 h-8 rounded-full"
                  }
                >
                  <h2 className="mx-auto font-semibold text-lg text-white">
                    2
                  </h2>
                </div>
                <div className="order-1 relative w-5/12 flex-grow md:flex-grow-0 text-white z-10">
                  <div className="absolute inset-y-16 inset-x-24 flex flex-col justify-center items-center">
                    <h3 className="md:mb-3 font-bold  text-xl">
                      Stage à l'école professionel commercial de Nyon
                    </h3>
                    <p className="text-sm hidden md:block">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                  <SvgBlob
                    variant="solid"
                    color="#383b99"
                    shapeProps={{ edges: 7 }}
                    className={"-z-10 w-full"}
                  />
                </div>
              </div>

              {/** left timeline item */}
              <div
                className={
                  "flex md:flex-row-reverse md:justify-between items-center w-full"
                }
              >
                <div className={"order-1 w-5/12 hidden md:block"}></div>
                <div
                  className={
                    "z-20  flex items-center order-1 bg-slate-800 shadow-xl w-8 h-8 rounded-full"
                  }
                >
                  <h2 className="mx-auto font-semibold text-lg text-white">
                    3
                  </h2>
                </div>
                <div className="order-1 relative w-5/12 flex-grow md:flex-grow-0 text-white z-10">
                  <div className="absolute inset-y-16 inset-x-24 flex flex-col justify-center items-center">
                    <h3 className="mb-3 font-bold  text-xl">
                      Stage chez Nagravision
                    </h3>
                    <p className="text-sm hidden md:block">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                  <SvgBlob
                    variant="solid"
                    color="#003265"
                    shapeProps={{ edges: 6 }}
                    className={"-z-10 w-full"}
                  />
                </div>
              </div>

              {/** right timeline item */}
              <div className={"flex md:justify-between items-center w-full"}>
                <div className={"order-1 w-5/12 hidden md:block"}></div>
                <div
                  className={
                    "z-20  flex items-center order-1 bg-slate-800 shadow-xl w-8 h-8 rounded-full"
                  }
                >
                  <h2 className="mx-auto font-semibold text-lg text-white">
                    4
                  </h2>
                </div>
                <div className="order-1 relative w-5/12 flex-grow md:flex-grow-0 text-white z-10">
                  <div className="absolute inset-y-16 inset-x-24 flex flex-col justify-center items-center">
                    <h3 className="md:mb-3 font-bold  text-xl">
                      Technicien ES
                    </h3>
                    <p className="text-sm hidden md:block">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                  <SvgBlob
                    variant="solid"
                    color="#00A65A"
                    shapeProps={{ edges: 7 }}
                    className={"-z-10 w-full"}
                  />
                </div>
              </div>

              {/** left timeline item */}
              <div
                className={
                  "flex md:flex-row-reverse md:justify-between items-center w-full"
                }
              >
                <div className={"order-1 w-5/12 hidden md:block"}></div>
                <div
                  className={
                    "z-20  flex items-center order-1 bg-slate-800 shadow-xl w-8 h-8 rounded-full"
                  }
                >
                  <h2 className="mx-auto font-semibold text-lg text-white">
                    5
                  </h2>
                </div>
                <div className="order-1 relative w-5/12 flex-grow md:flex-grow-0 text-white z-10">
                  <div className="absolute inset-y-16 inset-x-24 flex flex-col justify-center items-center">
                    <h3 className="mb-3 font-bold  text-xl">
                      Stage chez Antistatique
                    </h3>
                    <p className="text-sm hidden md:block">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                  <SvgBlob
                    variant="solid"
                    color="#DF00A9"
                    shapeProps={{ edges: 6 }}
                    className={"-z-10 w-full"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  let blogPosts: Array<object> = [];

  const blockId = process.env.NOTION_SRC_BLOCK;
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 4,
  }); //will get 3 elements

  blogPosts = response.results.filter(
    (post: any) => post.type === "child_page"
  );

  const posts = await Promise.all(
    blogPosts.map(async (post) => {
      const page = await notion.pages.retrieve({ page_id: post.id });
      const content = await notion.blocks.children.list({ block_id: post.id });
      return {
        ...post,
        child_page: {
          page,
          content,
        },
      };
    })
  );

  return {
    props: {
      blogPosts: posts,
    },
    revalidate: 10,
  };
}
