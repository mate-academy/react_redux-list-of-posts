import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const loadPostsByUser = createAsyncThunk<Post[], number>(
  'posts/fetchByUser',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadPostsByUser.pending, state => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(loadPostsByUser.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: true,
      hasError: false,
    }));

    builder.addCase(loadPostsByUser.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export default postsSlice.reducer;
