import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: '',
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

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
      state.loaded = false;
    });
    builder.addCase(init.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.loaded = true;
      state.posts = action.payload;
    });
    builder.addCase(init.rejected, state => {
      state.loaded = true;
      state.hasError = 'Something went wrong';
    });
  },
});

export default postsSlice.reducer;
