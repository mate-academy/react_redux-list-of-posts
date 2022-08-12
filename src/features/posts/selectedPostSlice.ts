/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

interface SelectedPostSlice {
  selectedPost: Post | null,
}

const initialState: SelectedPostSlice = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectPost(state, action: PayloadAction<Post | null>) {
      state.selectedPost = action.payload;
    },

    resetSelectedPost(state) {
      state.selectedPost = null;
    },
  },
});

export const { setSelectPost, resetSelectedPost } = selectedPostSlice.actions;
export const selectPost = (state: RootState) => state.selectedPost;

export default selectedPostSlice.reducer;
