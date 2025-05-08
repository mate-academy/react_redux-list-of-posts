/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { AppDispatch } from '../app/store';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setUsers, setLoading, setError } = usersSlice.actions;
export default usersSlice.reducer;

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const users = await getUsers();

    dispatch(setUsers(users));
  } catch (error) {
    dispatch(setError('Failed to load users'));
  } finally {
    dispatch(setLoading(false));
  }
};
