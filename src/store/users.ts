import { AnyAction, Dispatch } from 'redux';
import { getUsers } from '../api/users';

const USERS = 'USERS';

export const usersActions = {
  setUsers: (users: User[]) => ({ type: USERS, users }),
  loadUsers: () => (dispatch: Dispatch<AnyAction>) => {
    getUsers().then((res) => dispatch(usersActions.setUsers(res)));
  },
};

export const usersReducer = (users = [], action: AnyAction) => {
  switch (action.type) {
    case USERS:
      return action.users;

    default:
      return users;
  }
};
