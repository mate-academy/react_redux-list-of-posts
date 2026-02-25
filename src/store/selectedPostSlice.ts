import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { RootState } from './index';

type SelectedPostState = {
  current: Post | null;
};

const initialState: SelectedPostState = {
  current: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => ({
      ...state,
      current: action.payload,
    }),
    resetSelectedPost: state => ({
      ...state,
      current: null,
    }),
  },
});

export const { selectPost, resetSelectedPost } = selectedPostSlice.actions;
export const selectedPostReducer = selectedPostSlice.reducer;

export const selectSelectedPost = (state: RootState) =>
  state.selectedPost.current;
export const selectSelectedPostId = (state: RootState) =>
  state.selectedPost.current?.id;
