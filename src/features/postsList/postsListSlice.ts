import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
import Status from '../../enums/Status';

export interface PostsListState {
  posts: Post[],
  status: `${Status}`
}

const initialState: PostsListState = {
  posts: [],
  status: Status.Idle,
};

export const fetchUserPosts = createAsyncThunk(
  'postsList/fetchPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

export const postsListSlice = createSlice({
  name: 'postsList',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = Status.Idle;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});

export const { setPosts } = postsListSlice.actions;

export const postsList = (state: RootState) => (
  state.posts
);

export default postsListSlice.reducer;
