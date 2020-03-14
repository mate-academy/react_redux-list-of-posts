import {
  CommentInterface,
  PostInterface,
  PostsWithUserAndComments,
  UserInterface,
} from '../constants';
import { getComments, getPosts, getUsers } from './api';

export const getPostsWithUserAndComments: () => Promise<PostsWithUserAndComments[]> = async () => {
  const [users, comments, posts] = await Promise.all([
    getUsers(),
    getComments(),
    getPosts(),
  ]);

  const postsWithUserAndComments = posts.map((post: PostInterface) => {
    const user = users
      .find((person: UserInterface) => person.id === post.userId) as UserInterface;
    const commentsByUser = comments
      .filter((article: CommentInterface) => article.postId === post.id) as CommentInterface[];

    return {
      ...post,
      user,
      comments: commentsByUser,
    };
  });

  return postsWithUserAndComments;
};

export function searchCallback(query: string) {
  return (post: PostsWithUserAndComments) => post.title.includes(query)
    || post.body.includes(query);
}
