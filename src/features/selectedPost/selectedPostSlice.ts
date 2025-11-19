/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

type State = {
  selectedPost: Post | null;
};

const initialState: State = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const selectPost = (state: RootState) => state.selectedPost.selectedPost;
export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
