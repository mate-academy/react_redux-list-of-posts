import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

const initialState = {
  author: {} as User,
};

export const init = createAsyncThunk('user/loadUser',
  async () => getUsers());

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      return { ...state, author: action.payload };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(init.fulfilled, (state, action) => {
  //     return { ...state, users: action.payload };
  //   });
  // },
});

export default authorSlice.reducer;
