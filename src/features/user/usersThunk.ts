import { Dispatch } from '@reduxjs/toolkit';
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailed,
} from './userSlice';
import { getUsers } from '../../api/users';

export const fetchUsers = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchUsersStart());
    const response = await getUsers();

    dispatch(fetchUsersSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(fetchUsersFailed(error.message));
    } else {
      dispatch(fetchUsersFailed('unable to fetch users'));
    }
  }
};
