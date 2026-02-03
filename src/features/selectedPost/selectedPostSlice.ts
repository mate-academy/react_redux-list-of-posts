import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { RootState } from '../../app/store';

type SelectedPostState = Post | null;

const initialState: SelectedPostState = null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<Post | null>) =>
      action.payload,
    clearSelectedPost: () => null,
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;

export const selectedPostReducer = selectedPostSlice.reducer;

export const selectSelectedPost = (state: RootState) => state.selectedPost;
export const selectSelectedPostId = (state: RootState) =>
  state.selectedPost?.id;
