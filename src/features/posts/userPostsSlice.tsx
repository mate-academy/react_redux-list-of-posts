/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { fetchPosts } from '../../services/posts';
import { Post } from '../../types/Post';
import { fetchUserPosts } from '../../services/userPosts';

type State = {
  value: Post[]
  isLoading: boolean;
  error: null | string;
};

const initialState: State = {
  value: [],
  isLoading: false,
  error: null,
};

export const loadUserPosts = createAsyncThunk<Post[], number>(
  'posts/fetch',
  async (userId: number) => {
    const response = await fetchUserPosts(userId);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clear: (state) => {
      state.value = [];
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    set: (state, action: PayloadAction<Post[]>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    });

    builder.addCase(loadUserPosts.rejected, (state) => {
      state.error = 'Something went wrong';
      state.isLoading = false;
    });
  },
});

export default postsSlice.reducer;
export const { clear } = postsSlice.actions;
