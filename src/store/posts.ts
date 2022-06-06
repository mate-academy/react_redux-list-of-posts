import { Post } from '../types/Post';

// Action types
const SET_POSTS = 'SET_POSTS';

// Action creators
export type SetPostsAction = {
  type: string,
  posts: Post[],
};

export const setPosts = (posts: Post[]) => ({ type: SET_POSTS, posts });

const reducer = (posts = [], action: SetPostsAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;

    default:
      return posts;
  }
};

export default reducer;
