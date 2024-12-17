import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { RootState } from '../app/store';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const fetchPosts = createAsyncThunk<Post[], User['id']>(
  'posts/fetch',
  userId => {
    return getUserPosts(userId);
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        return { ...state, loading: true };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return { ...state, posts: action.payload, loading: false };
      })
      .addCase(fetchPosts.rejected, state => {
        return { ...state, error: 'Error', loading: false };
      });
  },
});

export default postSlice.reducer;

const posts = (state: RootState) => state.posts;

export const postsSelector = createSelector([posts], value => value);

export const { actions } = postSlice;
