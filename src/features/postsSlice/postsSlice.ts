import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface InitialState {
  posts: Post[],
  selectedPost: Post | null,
  status: 'idle' | 'loading' | 'failed',
}

export const initialState: InitialState = {
  posts: [],
  selectedPost: null,
  status: 'idle',
};

export const postsAsync = createAsyncThunk(
  'posts/postsAsync',
  async (number: number) => {
    const response = await getUserPosts(number);

    return response;
  },
);

export const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(postsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default postsReducer.reducer;

export const { setSelectPost } = postsReducer.actions;
