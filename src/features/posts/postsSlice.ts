/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface IPostsState {
  listPosts: Post[],
  selectPost: number | null,
  error: boolean,
  loader: boolean
}

const initialState: IPostsState = {
  listPosts: [],
  selectPost: null,
  error: false,
  loader: true,
};

export const getPostsAction = createAsyncThunk(
  'posts/GET',
  async (id:number) => {
    const result = await getUserPosts(id);

    return result;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectedPostAction: (state, action: PayloadAction<number | null>) => {
      state.selectPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsAction.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getPostsAction.fulfilled, (state, action) => {
      state.loader = false;
      state.listPosts = action.payload;
    });
    builder.addCase(getPostsAction.rejected, (state) => {
      state.error = true;
      state.loader = false;
    });
  },
});

export const { selectedPostAction } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
