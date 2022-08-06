import { AnyAction } from 'redux';

const defaultState = {
  users: [{
    name: 'All users',
    id: 0,
  }],
};

type User = {
  name: string;
  id: number;
};

type UserState = {
  users: User[],
};

export const GET_USERS = 'get_users';

export const usersReducer = (
  state: UserState = defaultState, action: AnyAction,
) => {
  switch (action.type) {
    case GET_USERS:
      return { users: state.users.concat(action.payload) };

    default:
      return state;
  }
};
