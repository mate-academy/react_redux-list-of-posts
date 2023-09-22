import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostsState {
  selectedPost: Post | null;
}

const initialState: PostsState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
    clearPost: (state) => {
      return {
        ...state,
        selectedPost: null,
      };
    },
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
