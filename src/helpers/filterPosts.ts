export const filterPosts = (posts: Post[], query: string) => {
  if (!query) {
    return posts;
  }

  return posts
    .filter(post => (
      post.title.toLocaleLowerCase() + post.body.toLocaleLowerCase
    )
      .replace(/s*/g, ' ')
      .includes(query.toLocaleLowerCase().replace(/s*/g, ' ')));
};
