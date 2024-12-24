import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk<Post[], User['id']>(
  'posts/fetch',
  userId => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
        };
      })
      .addCase(fetchPosts.pending, state => {
        return { ...state, loaded: false };
      })
      .addCase(fetchPosts.rejected, state => {
        return { ...state, hasError: true };
      })
      .addMatcher(fetchPosts.settled, state => {
        return { ...state, loaded: true };
      });
  },
});

export default postsSlice.reducer;

const posts = (state: RootState) => state.posts;

export const postsSelector = createSelector([posts], value => value);

export const { actions } = postsSlice;
