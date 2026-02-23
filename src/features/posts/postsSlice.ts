/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable */
/* prettier-ignore */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

// Define the initial state
const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

// Async thunk for fetching posts with improved error handling
export const fetchPosts = createAsyncThunk<
  Post[],
  number,
  { rejectValue: string }
>('posts/fetchPosts', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`,
    );

    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch posts');
  }
});

// Create the slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setError: state => {
      state.hasError = true;
      state.loaded = true;
      state.items = []; // Ensure items are reset on error
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        // eslint-disable-next-line no-console
        console.error('Fetch failed:', action.payload);
        state.hasError = true;
        state.loaded = true;
        state.items = []; // Reset items in case of failure
      });
  },
});

// Export actions and reducer
export const { setPosts, setError, setLoaded } = postsSlice.actions;
export default postsSlice.reducer;

// Selector function
export const selectPosts = (state: RootState) => state.posts.items;
