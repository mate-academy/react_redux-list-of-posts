import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export type SelectedPost = Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPost,
  reducers: {
    set: (_state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const { set } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
