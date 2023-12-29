import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
    },
  },
});

export const { actions } = postsSlice;

export default postsSlice.reducer;
