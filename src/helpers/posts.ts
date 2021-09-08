import { request } from './api';

export function getPosts(userId? : number) {
  if (userId) {
    return request(`posts?userId=${userId}`);
  }
  
  return request('posts?id=87&id=88&id=89&id=90&id=91&id=92&id=93');
}

export function getPostDetails(postId : number) {
  return request(`posts/${postId}`);
}
