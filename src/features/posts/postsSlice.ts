import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  (userId: number) => getUserPosts(userId),
);

interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  }
})

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
export type { PostsState };
