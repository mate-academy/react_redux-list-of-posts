import {
  PostType,
  UserType,
  CommentType,
  FullPostType,
} from './interfaces';

export const fullPosts = (posts: PostType[], users: UserType[], comments: CommentType[]) => {
  return posts.map((post: PostType) => ({
    ...post,
    user: users
      .find((person: UserType) => person.id === post.userId) as UserType,
    comments: comments
      .filter((comment: CommentType) => post.id === comment.postId) as CommentType[],
  }));
};


export const getFilteredPosts = (query: string, posts: FullPostType[]) => {
  const queryToLowerCase = query.toLowerCase();

  return posts.filter((post: PostType) => {
    const titleToLowerCase = post.title.toLowerCase();
    const bodyToLowerCase = post.body.toLowerCase();

    return (
      titleToLowerCase.includes(queryToLowerCase)
      || bodyToLowerCase.includes(queryToLowerCase)
    );
  });
};
