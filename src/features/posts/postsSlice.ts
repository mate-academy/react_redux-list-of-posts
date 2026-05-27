import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const fetchPostsByAuthor = createAsyncThunk<Post[], number>(
  'posts/fetchPostsByAuthor',
  async userId => getUserPosts(userId),
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
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => ({
      ...state,
      items: [],
      loaded: true,
      hasError: false,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByAuthor.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchPostsByAuthor.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      }))
      .addCase(fetchPostsByAuthor.rejected, state => ({
        ...state,
        items: [],
        loaded: true,
        hasError: true,
      }));
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
