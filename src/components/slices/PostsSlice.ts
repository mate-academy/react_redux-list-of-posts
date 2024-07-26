import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export type UserPosts = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserPosts = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  `/getPosts`,
  (selectedUser: number) => {
    return getUserPosts(selectedUser);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      const currentState = state;

      currentState.posts = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      const currentState = state;

      currentState.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      const currentState = state;

      currentState.loading = true;
      currentState.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const currentState = state;

      currentState.loading = false;
      currentState.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, state => {
      const currentState = state;

      currentState.loading = false;
      currentState.error = 'An error occurred while fetching posts.';
    });
  },
});

// eslint-disable-next-line prettier/prettier
export const {
  setPosts,
  setSelectedPost,
} = postsSlice.actions;
export default postsSlice.reducer;
