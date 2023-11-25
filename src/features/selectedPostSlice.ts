import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPost,
  reducers: {
    set: (_, action: PayloadAction<Post>) => action.payload,
    clear: () => null,
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
