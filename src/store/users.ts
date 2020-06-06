import { AnyAction } from 'redux';
import { UserType } from '../types';
import { LOADING_FINISH } from './index';

// Action types
export const SET_USERS = 'SET_USERS';

// Action creators
export const setUsers = (users: UserType[]) => ({ type: SET_USERS, users });

const reducer = (users = [], action: AnyAction) => {
  switch (action.type) {
    case SET_USERS:
    case LOADING_FINISH:
      return action.users;
    default:
      return users;
  }
};

export default reducer;
