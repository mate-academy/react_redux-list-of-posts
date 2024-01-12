import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface T {
  users: User[],
}

const initialState: T = {
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
  reducers: {
    // setUser: (state, action) => {
    //   return { ...state, users: action.payload };
    // },
  },
  /* eslint-disable no-param-reassign */
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    // builder.addCase(init.fulfilled, (state, action) => {
    //   return { ...state, users: action.payload };
    // });
  },
});

export default usersSlice.reducer;
