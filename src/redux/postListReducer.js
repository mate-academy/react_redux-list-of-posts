import {
  HANDLE_SUCCESS,
  HANDLE_REMOVE_POST,
  HANDLE_REMOVE_COMMENT,
} from './actions';

const postListReducer = (state = [], action) => {
  switch (action.type) {
    case HANDLE_SUCCESS:
      return action.posts;

    case HANDLE_REMOVE_POST:
      return state.filter(post => post.id !== action.id);

    case HANDLE_REMOVE_COMMENT:
      return state.map(post =>({
        ...post,
        comments: post.comments
          .filter(comment => comment.id !== action.id)
      }))

    default:
      return state;
  }
};

export default postListReducer;
