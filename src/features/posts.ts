import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[],
  selectedPost: Post | null,
  loading: boolean,
  error: string,
};

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: '',
};

export const init = createAsyncThunk('post/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return { ...state, posts: action.payload };
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return { ...state, loading: true };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: 'No posts yet',
      };
    });

    builder.addCase(init.rejected, (state) => {
      return { ...state, loading: false, error: '' };
    });
  },
});

export const { setPosts, setSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
