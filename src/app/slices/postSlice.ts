/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  status: 'idle',
};

export const getPostsByUserId = createAsyncThunk(
  'post/getAll',
  async (id: number) => {
    const posts = await getUserPosts(id);

    return posts;
  },
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectPost: (state: PostState, action: PayloadAction<Post>) => {
      const post = action.payload;

      state.selectedPost = post;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPostsByUserId.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getPostsByUserId.fulfilled,
        (state: PostState, action: PayloadAction<Post[]>) => {
          state.status = 'idle';
          state.posts = [...action.payload];
        },
      )
      .addCase(getPostsByUserId.rejected, (state: PostState) => {
        state.status = 'failed';
      });
  },
});

export const { selectPost } = postSlice.actions;
export default postSlice.reducer;
