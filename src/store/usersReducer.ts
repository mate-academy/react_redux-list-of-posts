import { AnyAction } from 'redux';
import { User } from '../types/User';

type State = {
  users: User[],
};

const defaultState: State = {
  users: [],
};

const FETCH_USERS = 'FETCH_USERS';

export const usersReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: [...action.payload],
      };

    default:
      return state;
  }
};

export const fetchUsersAction = (payload: User[]) => ({ type: FETCH_USERS, payload });
