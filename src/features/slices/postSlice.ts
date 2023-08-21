import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk('posts/fetch',
  async (userId: number) => {
    const postsFromServer = await getUserPosts(userId);

    return postsFromServer;
  });

type PostState = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state: PostState) => {
      state.loaded = false;
      state.hasError = false;
    })
      .addCase(fetchPosts.fulfilled, (
        state: PostState,
        action: PayloadAction<Post[]>,
      ) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, (state: PostState) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});
