import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface State {
  users: User[],
}

const initialState: State = {
  users: [],
};

export const init = createAsyncThunk('users/loadUser',
  async () => {
    const users = await getUsers();

    return users;
  });

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  /* eslint-disable no-param-reassign */
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
