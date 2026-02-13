/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
};

// eslint-disable-next-line @typescript-eslint/indent
export const fetchUserPosts = createAsyncThunk<
  Post[],
  number,
  { rejectValue: string }
>('posts/fetchUserPosts', async (userId: number, { rejectWithValue }) => {
  try {
    const res = await getUserPosts(userId);

    return res as Post[];
  } catch (err) {
    return rejectWithValue('Network error');
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(fetchUserPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
