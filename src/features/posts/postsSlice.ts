import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string;
}

const initialState: PostsState = {
  posts: [] as Post[],
  loading: false,
  error: '',
};

export const uploadPost = createAsyncThunk(
  'post/fetchPost',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetError: state => {
      return { ...state, error: '' };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(uploadPost.pending, state => {
        state.loading = true;
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(uploadPost.rejected, state => {
        state.error = 'Error loading posts';
      });
  },
});

export default postsSlice.reducer;
export const { resetError } = postsSlice.actions;
