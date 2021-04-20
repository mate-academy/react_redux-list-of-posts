import { OPTIONS, NEWCOMMENT } from '../type';
export const BASE_URL = 'https://mate-api.herokuapp.com';

const request = (url: string, options:OPTIONS) => fetch(`${BASE_URL}${url}`, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  })
  .then(result => {
    return result.data
  });
  
const remove = (url: string) => request(url, { method: 'DELETE' });

export const getUserPosts = (userId: number) => request(`/posts?userId=${userId}`, { method: 'GET' });
export const getPosts = () => request('/posts', { method: 'GET' } );
export const getPostDetails = (postId: number) => request(`/posts/${postId}`, { method: 'GET' } );
export const getPostComments = (postId: number) => request(`/comments?postId=${postId}`, { method: 'GET' });

export const deletePost = (postID: number) => remove(`/posts/${postID}`);
export const deletComment = (commentID: number) => remove(`/comments/${commentID}`);
export const createComment = (params: NEWCOMMENT) => fetch(`${BASE_URL}/comments`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({
    postId: params.postId,
    name: params.name,
    email: params.email,
    body: params.body,
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}- Error`);
    }

    return response.json();
  });
