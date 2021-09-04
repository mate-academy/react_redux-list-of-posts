import { BASE_URL, request } from './api';
import { Post } from '../types';

export function getPosts() {
  return request(`${BASE_URL}/posts`);
}

export function getUserPosts(userId: number) {
  return getPosts()
    .then(posts => posts.filter((post: Post|any) => (
      post.userId === userId
    )));
}

export function getPostDetails(postId: number) {
  return request(`${BASE_URL}/posts/${postId}`);
}
