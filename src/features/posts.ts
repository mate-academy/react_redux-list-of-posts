import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type Posts = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
  closePost: null;
};

const initialState: Posts = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
  closePost: null,
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, { payload }: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: payload };
    },
    closePost: state => {
      return { ...state, selectedPost: null };
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: true, hasError: false };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, items: action.payload, loaded: false };
    });
    builder.addCase(init.rejected, state => {
      return { ...state, hasError: true, loaded: false };
    });
  },
});

export default postsSlice.reducer;
export const { setSelectedPost, closePost } = postsSlice.actions;
