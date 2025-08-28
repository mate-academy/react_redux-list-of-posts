/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { getUserPosts } from '../../api/posts';

type AppState = {
  posts: Post[] | [];
  loaded: boolean;
  hasError: boolean;
  author: User | null;
  selectedPost: Post | null;
};

const initialState: AppState = {
  posts: [] as Post[],
  loaded: false,
  hasError: false,
  author: null,
  selectedPost: null,
};

export const init = createAsyncThunk(
  'AppInfo/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const infoAppSlice = createSlice({
  name: 'AppInfo',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[] | []>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = false;
    });
    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export default infoAppSlice.reducer;
export const { setAuthor, setSelectedPost, setPosts } = infoAppSlice.actions;
export const { posts, loaded, hasError, author, selectedPost } = initialState;
