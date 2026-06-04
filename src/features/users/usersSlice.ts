/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
};
const initialState: UsersState = { users: [], loading: true, error: '' };
const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { setLoading, setError, setUsers } = usersSlice.actions;
