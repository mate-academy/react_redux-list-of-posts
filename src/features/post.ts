import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

interface PostProps {
  items: Post[];
  loader: boolean;
  error: boolean;
}

const initialState: PostProps = {
  items: [],
  loader: false,
  error: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loader = true;
      state.error = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loader = false;
      state.items = action.payload;
      state.error = false;
    });
    
    builder.addCase(fetchPosts.rejected, state => {
      state.loader = false;
      state.error = true;
    });
  },
});

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;
