/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/User';
import { Post } from '../../../types/Post';
import { getUserPosts } from '../../../api/posts';

const initialState = {
  loading: false,
  userSelected: {} as User,
  userIdPosts: [] as Post[],
  error: '',
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const posts: Post[] = await getUserPosts(userId);

    return posts;
  },
);

export const selectedUsersSlice = createSlice({
  name: 'user/set',
  initialState,
  reducers: {
    addUsersId(state, { payload }: PayloadAction<User>) {
      state.userSelected = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.userIdPosts = action.payload;
      state.loading = false;
    });
    builder.addCase(loadPosts.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
  },
});
export const { addUsersId } = selectedUsersSlice.actions;
export default selectedUsersSlice.reducer;
