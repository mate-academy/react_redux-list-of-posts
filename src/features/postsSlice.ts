import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostItems = {
  posts: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: PostItems = {
  posts: [],
  loaded: false,
  hasError: '',
};

export const postsAsync = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'items/post',
  initialState,
  reducers: {
    clearPosts: state => ({
      ...state,
      posts: [],
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(postsAsync.pending, state => ({
        ...state,
        loaded: true,
      }))
      .addCase(
        postsAsync.fulfilled,
        (state, action: PayloadAction<Post[]>) => ({
          ...state,
          loaded: false,
          posts: action.payload,
        }),
      )
      .addCase(postsAsync.rejected, state => ({
        ...state,
        loaded: false,
        hasError: 'Error',
      }));
  },
});

export const { actions } = postsSlice;

export default postsSlice.reducer;
