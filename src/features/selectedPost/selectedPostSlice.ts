import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export type SelectedPost = Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPost,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
