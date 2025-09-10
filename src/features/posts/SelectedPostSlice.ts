import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Post } from '../../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post>) {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
    clearSelectedPost(state) {
      return {
        ...state,
        selectedPost: null,
      };
    },
  },
});

export const selectCurrentPost = (state: RootState) => state.selectedPost;
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
