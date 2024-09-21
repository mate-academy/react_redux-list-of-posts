import { Post } from '../types/Post';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PostState = {
  posts: Post[];
};

const initialState: PostState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, { payload }: PayloadAction<Post[]>) {
      state.posts = payload;
    },
  },
});

export default postsSlice.reducer;
