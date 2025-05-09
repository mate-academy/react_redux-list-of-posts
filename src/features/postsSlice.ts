import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { wait } from '../utils/fetchClient';

export interface PostState {
  items: Post[];
  loading: boolean;
  errorMessage: string;
}

const initialState: PostState = {
  items: [],
  loading: false,
  errorMessage: '',
};

export const init = createAsyncThunk(
  'posts/fetchByUserId',
  async (userId: number) => {
    await wait(2000);

    // eslint-disable-next-line @typescript-eslint/return-await
    return await getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.errorMessage = '';
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.errorMessage = 'error';
    });
  },
});

export default postsSlice.reducer;
