import { Post } from "./interfaces";

const POSTS_URL = 'https://mate-api.herokuapp.com/posts';

export const fetchUserPosts = async (userId: number) => {
  let posts;
  !userId ? (
    posts = fetch(`${POSTS_URL}`)
      .then(promise => promise.json())
      .then(result => result.data)
  ) : (
      posts = fetch(`${POSTS_URL}?userId=${userId}`)
        .then(promise => promise.json())
        .then(result => result.data)
    )

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
    .then(result => result.data.filter((post: Post) => post.id !== postId));

  return posts;
};
