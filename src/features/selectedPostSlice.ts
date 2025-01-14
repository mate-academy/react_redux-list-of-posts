import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostSliceType = {
  selectedPost: Post | null;
};

const initialState: PostSliceType = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post | null>) {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
  },
});

export const { addPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
