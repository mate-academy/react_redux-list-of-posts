import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPostByUser = createAsyncThunk(
  'posts/fetchPostByUser',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      return { ...state, items: [], loaded: false, hasError: false };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostByUser.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchPostByUser.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
          state.loaded = true;
          state.hasError = false;
        },
      )
      .addCase(fetchPostByUser.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
