/* eslint-disable no-param-reassign */
import { Post } from '../../../types/Post';
import { User } from '../../../types/User';
import { getUserPosts } from '../../../api/posts';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostState {
  author: User | null;
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
}

const initialState: PostState = {
  author: null,
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetchByUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await getUserPosts(userId);
    } catch {
      return rejectWithValue('Failed to load posts');
    }
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User | null>) {
      state.author = action.payload;
      state.selectedPost = null;
      state.items = [];
      state.hasError = false;
    },
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { setAuthor, setSelectedPost } = postSlice.actions;
export default postSlice.reducer;
