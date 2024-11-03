/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    changeSelectedPost: (_state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
