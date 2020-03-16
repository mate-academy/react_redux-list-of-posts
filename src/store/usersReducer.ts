import { AnyAction } from 'redux';
import { SET_USERS } from './actionTypes';

export const usersReducer = (state = [], action: AnyAction) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;

    default:
      return state;
  }
};
