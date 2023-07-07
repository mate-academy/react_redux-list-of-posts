/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface UsersState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  posts: [],
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'posts/fetchPosts',
  (id: number) => {
    return getUserPosts(id);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectedPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
