import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

const initialState = {
  users: [] as User[],
};

export const init = createAsyncThunk('user/loadUser',
  async () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // setUser: (state, action) => {
    //   return { ...state, users: action.payload };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, users: action.payload };
    });
  },
});

export default usersSlice.reducer;
