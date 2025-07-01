/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
// eslint-disable-next-line import/no-cycle

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },

    clearSelectedPost: state => {
      state.selectedPost = null;
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
