import {
  SEARCHING_POSTS,
} from './actions';

const searchingPostsReducer = (state = [], action) => {
  switch (action.type) {

    case SEARCHING_POSTS:
      return action.searchingPosts;

    default:
      return state;
  }
};

export default searchingPostsReducer;
