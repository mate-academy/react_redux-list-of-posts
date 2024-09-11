import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostsSlice = {
  selectedPost: Post | null;
};

const initialState: SelectedPostsSlice = {
  selectedPost: null,
};

export const selectedPostsSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPosts: action.payload };
    },
    setClear: state => {
      return { ...state, selectedPost: null };
    },
  },
});

export const selectedPostsReducer = selectedPostsSlice.reducer;
export const { setSelectedPost, setClear } = selectedPostsSlice.actions;
