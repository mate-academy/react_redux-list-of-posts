import { AnyAction } from 'redux';

const SET_USERS = 'SET_USERS';

export const setUsers = (users: Users[]) => ({ type: SET_USERS, users });

const reducer = (users = [], action: AnyAction) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;

    default:
      return users;
  }
};

export default reducer;
