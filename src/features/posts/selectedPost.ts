/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPost = Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPost,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<SelectedPost>) => {
      state = action.payload;

      return state;
    },

    clearSelectedPost: (state) => {
      state = null;

      return state;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
