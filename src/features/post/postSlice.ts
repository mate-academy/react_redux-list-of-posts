import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from './postAPI';

type PostsState = {
  posts: Post[];
  selectedPost?: Post | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loaded: false,
  hasError: false,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  fetchPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      if (action.payload) {
        // eslint-disable-next-line no-param-reassign
        state.selectedPost =
          state.posts.find(post => post.id === action.payload?.id) || null;
      } else {
        // eslint-disable-next-line no-param-reassign
        state.selectedPost = null;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
    builder.addCase(initPosts.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
    builder.addCase(initPosts.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
  },
});

export default postsSlice.reducer;
export const { setPost } = postsSlice.actions;
