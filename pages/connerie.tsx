await posts.map(async (child_page: any) => {
    let blogPost: BlogPostProps = { title: "", description: "", cover: "" };

    const post = await notion.pages.retrieve({ page_id: child_page.id });

    blogPost.title = post.properties.title.title[0].text.content;
    blogPost.cover = post.cover[post.cover.type].url;

    if ('file' in post.icon) {
      blogPost.icon = post.icon.file.url;
    }
    if ('emoji' in post.icon) {
      blogPost.icon = post.icon.emoji;
    }

    const content = await notion.blocks.children.list({ block_id: post.id });

    blogPost.description = content.results.find((block: any, index: number, array: Array<object>) => {
      return block.type === 'paragraph'
        && array[index - 1].type === 'heading_1'
        && array[index - 1].heading_1.text[0].text.content.toLowerCase() === 'introduction';
    }).paragraph.text[0].text.content;

    blogPosts.push(blogPost)

    return blogPost;
  });