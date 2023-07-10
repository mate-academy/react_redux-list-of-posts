import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const init = createAsyncThunk('users/fetch', () => getUsers());

export type UsersState = {
  users: User[],
};

const initialState: UsersState = {
  users: [],
};

export const usersSlise = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    });
  },
});

export default usersSlise.reducer;
export const { actions } = usersSlise;
