import { POST_DELETE, HANDLE_SUCCESS, COMMENT_DELETE } from '../actions';

const postListReducer = (state = [], action) => {
  switch (action.type) {
    case HANDLE_SUCCESS:
      return action.combineData;

    case POST_DELETE:
      console.log(state, 'state');

      return state
        .filter(post => post.id !== action.id);

    case COMMENT_DELETE:
      return state.map(post => ({
        ...post,
        comments: post.comments.filter(comment => comment.id !== action.id),
      }));

    default:
      return state;
  }
};

export default postListReducer;
