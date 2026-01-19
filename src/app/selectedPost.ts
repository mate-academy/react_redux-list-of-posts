import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

import { set as setAuthor } from './author';

export type InitialStateType = Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as InitialStateType,
  reducers: {
    set(_, action: PayloadAction<Post | null>) {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setAuthor.type, () => {
      return null;
    });
  },
});

export const { set } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
