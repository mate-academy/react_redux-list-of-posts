import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type CurrentPost = Post | null;

const initialState = null as CurrentPost;

export const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState: initialState,
  reducers: {
    setCurrentPost: (_state, action: PayloadAction<Post | null>) =>
      action.payload,
  },
});

export const { setCurrentPost } = currentPostSlice.actions;
export default currentPostSlice.reducer;
