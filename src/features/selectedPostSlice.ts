import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = {
  selectedPost: Post | null;
};

const initialState: SelectedPost = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelctedPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: action.payload };
    },
  },
});

export const { setSelctedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
