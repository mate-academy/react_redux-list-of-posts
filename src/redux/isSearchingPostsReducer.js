import {
  SEARCHING_POSTS,
} from './actions';

const isSearchingPostsReducer = (state = false, action) => {
  switch (action.type) {

    case SEARCHING_POSTS:
        return true;

    default:
      return state;
  }
};

export default isSearchingPostsReducer;
