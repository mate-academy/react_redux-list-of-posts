import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostState = Post | null;

const initialState: PostState = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState as PostState,
  reducers: {
    select: (_value, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { select } = selectedPostSlice.actions;
