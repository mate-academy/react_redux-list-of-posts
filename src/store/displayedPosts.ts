import { Post } from '../types/Post';

// Action types
const SET_DISPLAYED_POSTS = 'SET_DISPLAYED_POSTS';

// Action creators
export type SetPostsAction = {
  type: string,
  displayedPosts: Post[],
};

export const setDisplayedPosts = (displayedPosts: Post[] | null) => ({
  type: SET_DISPLAYED_POSTS,
  displayedPosts,
});

const reducer = (posts = [], action: SetPostsAction) => {
  switch (action.type) {
    case SET_DISPLAYED_POSTS:
      return action.displayedPosts;

    default:
      return posts;
  }
};

export default reducer;
