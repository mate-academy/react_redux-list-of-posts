const POSTS_URL = 'https://mate-api.herokuapp.com/posts';

export const fetchUserPosts = async(userId: number) => {
  const posts = fetch(`${POSTS_URL}`)
    .then(promise => promise.json())
    .then(result => (userId
      ? result.data.filter((post: any) => post.userId === userId)
      : result.data));

  return posts;
};

export const fetchPostDetails = (postId: number) => {
  const posts = fetch(`${POSTS_URL}/${postId}`)
    .then(promise => promise.json())
    .then(result => result.data);

  return posts;
};

export const deletePost = (postId: number) => {
  const posts = fetch(`${POSTS_URL}`)
    .then(promise => promise.json())
    .then(result => result.data.filter((post: any) => post.id !== postId));

  return posts;
};
