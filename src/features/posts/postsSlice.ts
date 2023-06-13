import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostsState = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },

    set: (state, action: PayloadAction<Post[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
