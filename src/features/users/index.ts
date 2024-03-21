import { loadUsers } from './actions';
import { actions, reducer } from './users.slice';

const allActions = {
  ...actions,
  loadUsers,
};

export { allActions as actions };
export default reducer;
