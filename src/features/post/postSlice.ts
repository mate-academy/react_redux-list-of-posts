import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[];
  selectedPost?: Post | null;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  isLoading: false,
  hasError: false,
};

export const initPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
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
      state.isLoading = true;
    });
    builder.addCase(initPosts.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
    });
    builder.addCase(initPosts.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
    });
  },
});

export default postsSlice.reducer;
export const { setPost } = postsSlice.actions;
