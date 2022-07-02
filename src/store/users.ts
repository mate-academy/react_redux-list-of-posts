import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { getUsers } from '../api/users';

const USERS = 'USERS';
const USER_ID = 'USER_ID';

export const selectors = {
  getUserId: (state: RootState) => state.userId,
  getUsers: (state: RootState) => state.users,
};

export const actions = {
  setUsers: (users: User[]) => ({ type: USERS, users }),
  setUserId: (userId: number) => ({ type: USER_ID, userId }),
  loadUsers: () => (dispatch: Dispatch<unknown>) => {
    getUsers().then((res) => dispatch(actions.setUsers(res)));
  },
};

export const userReducer = (state = {
  users: [],
  userId: 0,
}, action: AnyAction) => {
  switch (action.type) {
    case USERS:
      return {
        ...state,
        users: action.users,
      };
    case USER_ID:
      return {
        ...state,
        userId: action.userId,
      };
    default:
      return state;
  }
};
