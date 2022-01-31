import { LOAD_USERS } from './types';
import { User } from '../Types/User';

const initialState = {
  users: [] as User[],
};

export const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        users: action.data,
      };
    default:
      return state;
  }
};
