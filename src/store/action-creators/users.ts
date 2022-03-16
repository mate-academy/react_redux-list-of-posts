import { Dispatch } from 'react';
import { BASE_URL } from '../../helpers/api';
import { UsersAction, UsersActionTypes } from '../types/users';

export const fetchUsers = () => {
  return async (dispatch: Dispatch<UsersAction>) => {
    try {
      dispatch({ type: UsersActionTypes.FETCH_USERS });
      const response = await fetch(`${BASE_URL}/users`);

      const usersFromServer = response.json();

      dispatch({
        type: UsersActionTypes.FETCH_USERS_SUCCESS,
        payload: await usersFromServer,
      });
    } catch (error) {
      dispatch({
        type: UsersActionTypes.FETCH_USERS_ERROR,
        payload: 'loading error',
      });
    }
  };
};

export const setSelectedUser = (userId: number): UsersAction => {
  return ({ type: UsersActionTypes.SET_SELECTED_USERID, payload: userId });
};
