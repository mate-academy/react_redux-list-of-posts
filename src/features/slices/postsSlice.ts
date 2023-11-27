/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // eslint-disable-next-line import/no-cycle
// import { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const gettingPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(gettingPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(gettingPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(gettingPosts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
