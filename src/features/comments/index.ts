import {
  loadPostComments,
  deletePostComment,
  addPostComment,
} from './actions';

import { actions, reducer } from './comments.slice';

const allActions = {
  ...actions,
  loadPostComments,
  deletePostComment,
  addPostComment,
};

export { allActions as actions };
export default reducer;
