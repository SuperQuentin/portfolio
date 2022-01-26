import DefaultLayout from "../../components/layouts/DefaultLayout";
import BlogPost from "../../components/BlogPost";
import { BlogPostProps } from "../components/BlogPost";
import { ReactElement } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const { Client } = require("@notionhq/client");

const Blog = ({ blogPosts }: { blogPosts: Array<BlogPostProps> }) => {
  return (
    <div className={clsx("max-w-7xl mx-auto min-h-screen")}>
      <div className={clsx("space-y-8 py-16 px-4")}>
        <h2
          className={clsx(
            "text-3xl font-semibold border-b-4 border-red-500 max-w-fit pb-2 ml-4"
          )}
        >
          Blog
        </h2>
        <motion.div
          initial="hidden"
          animate="visible"
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
        </motion.div>
      </div>
    </div>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Blog;

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  let blogPosts: Array<object> = [];

  const blockId = process.env.NOTION_SRC_BLOCK;
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });

  // Notion return all objects and the api doesn't offer a proper filter so i do it after match, i only want child_page type
  blogPosts = response.results.filter(
    (post: any) => post.type === "child_page"
  );

  const posts = await Promise.all(
    blogPosts.map(async (post) => {
      // Need to retreive more informations abouts the content of a child_page
      const page = await notion.pages.retrieve({ page_id: post.id });
      const content = await notion.blocks.children.list({ block_id: post.id });

      // Build a new object with the information combine i need to display title, description, icon, etc...
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
