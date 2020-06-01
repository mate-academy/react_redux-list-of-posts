import { AnyAction } from 'redux';
import { UserType } from '../types';

// Action types
export const SET_USERS = 'SET_USERS';

// Action creators
export const setUsersCreator = (users: UserType[]) => ({ type: SET_USERS, users });

const reducer = (users = [], action: AnyAction) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;

    default:
      return users;
  }
};

export default reducer;
