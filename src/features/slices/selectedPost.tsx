import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostType = {
  selectedPostItem: Post | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostType = {
  selectedPostItem: null,
  loaded: false,
  hasError: false,
};

export const selectedPost = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPostItem: action.payload };
    },
  },
});

export const { setSelectedPost } = selectedPost.actions;
