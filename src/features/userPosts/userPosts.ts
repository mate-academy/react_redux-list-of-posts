/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type UserPosts = {
  posts: Post[],
  loading: boolean,
  error: boolean,
};

const initialState: UserPosts = {
  posts: [],
  loading: false,
  error: false,
};

export const init = createAsyncThunk('userPosts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    add: (state: UserPosts, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    remove: (state: UserPosts, action: PayloadAction<Post>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
    clear: (state: UserPosts) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state: UserPosts) => {
      state.loading = true;
    });

    builder.addCase(init.rejected, (state: UserPosts) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(init.fulfilled,
      (state: UserPosts, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loading = false;
      });
  },
});

export default userPostsSlice.reducer;
export const { add, remove, clear } = userPostsSlice.actions;
