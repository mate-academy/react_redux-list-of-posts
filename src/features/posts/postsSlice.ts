import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
import { User } from '../../types/User';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: User['id']) => getUserPosts(userId),
);

export interface PostsState {
  items: Post[];
  loaded: boolean;
  error: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),

    clearPosts: () => ({
      items: [],
      loaded: false,
      error: false,
    }),
  },

  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => ({
      ...state,
      loaded: false,
      error: false,
    }));

    builder.addCase(fetchPosts.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: true,
      error: false,
    }));

    builder.addCase(fetchPosts.rejected, state => ({
      ...state,
      loaded: true,
      error: true,
    }));
  },
});

export default postsSlice.reducer;
export const { setPosts, clearPosts } = postsSlice.actions;
