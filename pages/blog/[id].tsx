import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const Post = () => {
  const router = useRouter();
  const { id } = router.query; // get id from query string

  return <h2>Post : {id}</h2>;
};

Post.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Post;
