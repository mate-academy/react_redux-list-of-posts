import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostState = {
  selectedPost: Post | null;
};

const initialState: PostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, { payload }: PayloadAction<Post | null>) {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = payload;
    },
  },
});

export default selectedPostSlice.reducer;
