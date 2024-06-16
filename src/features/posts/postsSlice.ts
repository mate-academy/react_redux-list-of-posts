import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { RootState } from '../../app/store';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
  },
});

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
export const { actions } = postsSlice;
