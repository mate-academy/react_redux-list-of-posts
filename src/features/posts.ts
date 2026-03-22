import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: string | null;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setUserPosts(state, action: PayloadAction<Post[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loaded = true;
        state.hasError = action.error.message || 'Щось пішло не так';
      });
  },
});

export const { setUserPosts } = postsSlice.actions;
export default postsSlice.reducer;
