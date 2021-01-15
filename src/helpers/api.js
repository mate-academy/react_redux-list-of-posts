export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (all, id = '', options) => fetch(
    `${BASE_URL}/${all}/${id}`, options,
  )
  .then(response => response.json())
  .then(result => result.data);

// Comments
export const getPostComments = postId => request('comments')
  .then(result => result.filter(post => post.postId === postId));

export const deleteComment = commentId => request('comments', commentId, {
  method: 'DELETE'
});

export const addComment = options => request('comments', '', options);

// Posts
export const getUserPosts = userId => request('posts')
  .then(result => result.filter(post => (
    userId ? post.userId === userId : post
  )));

export const getPostDetails = postId => request('posts', postId)
  .then(result => result);
