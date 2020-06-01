import { AnyAction } from 'redux';
import { PostType } from '../types';

// Action types
export const SET_FILTERED_POSTS = 'SET_FILTERED_POSTS';

// Action creators
export const setFilteredPostsCreator = (filteredPosts: PostType[]) => ({ type: SET_FILTERED_POSTS, filteredPosts });

const reducer = (filteredPosts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_FILTERED_POSTS:
      return action.filteredPosts;
    default:
      return filteredPosts;
  }
};

export default reducer;
