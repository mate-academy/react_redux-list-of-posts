import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const items = await getUserPosts(userId);

    return items;
  },
);

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = false;
    });

    builder.addCase(fetchPosts.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
