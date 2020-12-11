import { Comment } from "./interfaces";

const COMMENTS_URL = 'https://mate-api.herokuapp.com/comments';

export const getPostComments = async(postId: number) => {
  const comments = await fetch(`${COMMENTS_URL}`)
    .then(promise => promise.json())
    .then(result => result.data);

  return comments.filter((comment: Comment) => comment.postId === postId);
};

export const removePostComment = async (commentId: number) => {
  const comments = await fetch(`${COMMENTS_URL}/${commentId}`, { method: 'DELETE' })
    .then(promise => promise.json())
    .then(result => result.data);

  return comments;
};

export const addPostComment = async (newComment: object) => {
  const comments = await fetch(`${COMMENTS_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  })
    .then(promise => promise.json())
    .then(result => result.data);

  return comments;
};
