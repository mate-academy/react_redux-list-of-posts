import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostsState = {
  posts: Post[],
  selectedPost: Post | null,
  isLoaded: boolean,
  hasError: boolean,
};

const InitialState: PostsState = {
  posts: [],
  selectedPost: null,
  isLoaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: InitialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
