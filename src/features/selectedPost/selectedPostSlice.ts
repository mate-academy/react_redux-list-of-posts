/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export type PostState = {
  post: Post | null,
};

const initialState: PostState = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
  },
});

export const { actions } = selectedPostSlice;

export default selectedPostSlice.reducer;
