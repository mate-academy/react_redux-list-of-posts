import { HANDLE_SUCCESS, HANDLE_REMOVE } from './actions';

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case HANDLE_SUCCESS:
      return action.posts;

    case HANDLE_REMOVE:
      return state.filter(post => post.id !== action.id);

    default:
      return state;
  }
};

export default postsReducer;
