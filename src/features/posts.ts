import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const init = createAsyncThunk('posts/fetch', async (userId: number) => {
  const value = await getUserPosts(userId);

  return value;
});

type PostsState = {
  items: Post[],
  selectedPost: Post | null,
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  items: [],
  selectedPost: null,
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: action.payload };
    },

    clearPosts: (state) => {
      return { ...state, items: [] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return {
        ...state,
        loaded: true,
      };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: false,
      };
    });

    builder.addCase(init.rejected, (state) => {
      return {
        ...state,
        hasError: true,
        loaded: false,
      };
    });
  },
});

export default postsSlice.reducer;
export const { setSelectedPost, clearPosts } = postsSlice.actions;
