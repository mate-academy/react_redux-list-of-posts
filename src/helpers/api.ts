import { Comment } from '../types/Comment';

interface Params {
  method: string,
  headers?: {
    'Content-Type': string,
  },
  body?: string,
}

const BASE_URL = 'https://mate.academy/students-api';

const request = async (endPoint: string, params: Params = { method: 'GET' }) => {
  try {
    const response = await fetch(`${BASE_URL}${endPoint}`, params);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Error with request');
    }

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return null;
  }
};

export const API = {
  getPosts: () => request('/posts'),
  getPostDetails: (postId: number | string) => request(`/posts/${postId}`),
  getPostComments: (postId: number | string) => {
    return request('/comments')
      .then(data => data.filter((el: Comment) => el.postId === postId));
  },
  addComment: (comment: Partial<Comment>) => request('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  }),
  deleteComment: (id: number) => request(`/comments/${id}`, { method: 'DELETE' }),
};
