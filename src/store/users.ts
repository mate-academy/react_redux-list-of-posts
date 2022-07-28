import { AnyAction } from 'redux';
import { User } from '../types/user';

const SET_USERS = 'SET_USERS';
const SET_LOAD_USERS_ERROR = 'SET_LOAD_USERS_ERROR';
const SET_SELECTED_USER_ID = 'SET_SELECTED_USER_ID';

export type UsersState = {
  users: User[],
  loadUsersError: boolean,
  selectedUserId: number,
};

const initialState = {
  users: [],
  loadUsersError: false,
  selectedUserId: 0,
};

export const selectors = {
  getUsers: (state: UsersState) => state.users,
  getLoadUsersError: (state: UsersState) => state.loadUsersError,
  getSelectedUserId: (state: UsersState) => state.selectedUserId,
};

export const actions = {
  setUsers: (users: User[]) => ({ type: SET_USERS, users }),
  setLoadUsersError: () => ({ type: SET_LOAD_USERS_ERROR }),
  setSelectedUserId: (userId: number) => {
    return { type: SET_SELECTED_USER_ID, userId };
  },
};

const usersReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...action,
        users: action.users,
      };

    case SET_LOAD_USERS_ERROR:
      return {
        ...state,
        loadUsersError: true,
      };

    case SET_SELECTED_USER_ID:
      return {
        ...state,
        selectedUserId: action.selectedUserId,
      };

    default:
      return state;
  }
};

export default usersReducer;
