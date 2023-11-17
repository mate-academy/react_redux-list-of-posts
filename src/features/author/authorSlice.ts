/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser } from '../../api/users';

type InitialState = {
  author: User | null
};

const initialState:InitialState = {
  author: null,
};

export const init = createAsyncThunk('author/fetch', (id:number) => {
  return getUser(id);
});

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.author = action.payload;
    });
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
