export const matchedPosts = (posts: DataPost[], value: string) => {
  if(!value){
    return posts;
  }

  const regexp = new RegExp(value, 'i');
  const matchedPosts = posts.filter(post => (regexp.test(post.title) || regexp.test(post.body)));

  return matchedPosts;
};
