import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type SelectedPostState = {
  post: Post | null;
};

const initialState: SelectedPostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        post: action.payload,
      };
    },
    clearPost: state => {
      return {
        ...state,
        post: null,
      };
    },
  },
});
