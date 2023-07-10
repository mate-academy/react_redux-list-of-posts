import { State } from '../types/State';

const createPropertySelector = <T extends keyof State>(property: T) => {
  return (state: State) => state[property];
};

export const postsSelector = createPropertySelector('posts');
export const authorSelector = createPropertySelector('author');
export const selectedPostSelector = createPropertySelector('selectedPost');
export const commentsSelector = createPropertySelector('comments');
export const usersSelector = createPropertySelector('users');
