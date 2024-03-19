import { loadPostComments } from './actions';
import { actions, reducer } from './comments.slice';

const allActions = {
  ...actions,
  loadPostComments,
};

export { allActions as actions };
export default reducer;
