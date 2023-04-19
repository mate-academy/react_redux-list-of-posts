/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = {
  post: Post | null
};

const initialState: SelectedPostState = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectePost(state, action: PayloadAction<Post>) {
      state.post = action.payload;
    },
    clearPost(state) {
      state.post = null;
    },
  },
});

export default selectedPostSlice.reducer;

export const { selectePost, clearPost } = selectedPostSlice.actions;
