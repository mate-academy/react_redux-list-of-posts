import { loadUserPosts } from './actions';
import { actions, reducer } from './posts.slice';

const allActions = {
  ...actions,
  loadUserPosts,
};

export { allActions as actions };
export default reducer;
