import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[];
  isPostsLoading: boolean;
  postsError: string;
};

const initialState: PostState = {
  posts: [],
  isPostsLoading: false,
  postsError: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isPostsLoading = true;
    });
    builder.addCase(init.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.isPostsLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(init.rejected, state => {
      state.isPostsLoading = false;
      state.postsError = 'Something went wrong';
    });
  },
});

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export default postsSlice.reducer;
