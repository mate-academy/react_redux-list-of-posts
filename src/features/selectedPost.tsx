/* eslint-disable */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialPost = null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialPost as Post | null,
  reducers: {
    setSelectedPost: (_value, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
