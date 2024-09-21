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
      // eslint-disable-next-line no-param-reassign
      state.posts = payload;
    },
  },
});

export default postsSlice.reducer;
