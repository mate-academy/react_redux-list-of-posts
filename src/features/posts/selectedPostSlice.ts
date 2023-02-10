import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostState = Post | null;

const initialState: PostState = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState as PostState,
  reducers: {
    selectPost: (_state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const { selectPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
