import { UsersState, UsersAction, UsersActionTypes } from '../types/users';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  selectedUserId: null,
};

export const usersReducer = (state = initialState, action: UsersAction) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS:
      return {
        ...state,
        loading: true,
      };

    case UsersActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...action.payload],
      };

    case UsersActionTypes.FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UsersActionTypes.SET_SELECTED_USERID:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    default:
      return state;
  }
};
