import { Reducer } from 'react';
import { User } from '../../types/User';

import { UserActionTypes, UserActions } from './actionTypes';

const defaultState = {
  user: null,
};

export type UserState = {
  user: User | null;
};

export const UserReducer: Reducer<UserState, UserActions> = (
  state: UserState = defaultState,
  action: UserActions,
) => {
  switch (action.type) {
    case UserActionTypes.SetUser:
      return ({
        ...state,
        user: action.user,
      });

    default:
      return state;
  }
};
