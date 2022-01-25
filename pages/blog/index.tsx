import DefaultLayout from "../../components/layouts/DefaultLayout";
import { ReactElement } from "react";

const Blog = () => {
    return (
        <h2>Blog</h2>
    )
}

Blog.getLayout = function getLayout(page: ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default Blog;
