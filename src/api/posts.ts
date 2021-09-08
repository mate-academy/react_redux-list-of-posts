import { request } from './api';

export function getPosts(userId? : number) {
  if (userId) {
    return request(`posts?userId=${userId}`);
  }

  return request('posts');
}

export function getPostDetails(postId : number) {
  return request(`posts/${postId}`);
}
