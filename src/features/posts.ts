import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type State = {
  loaded: boolean,
  hasError: boolean,
  items: Post[],
  selectedPost: Post | null,
};

const initialState: State = {
  loaded: true,
  hasError: false,
  items: [],
  selectedPost: null,
};

export const fetchUserPosts = createAsyncThunk(
  'fetchUserPosts',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

/* eslint-disable no-param-reassign */
const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setPost: (state: State, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserPosts.pending, (state: State) => {
        state.loaded = false;
      })
      .addCase(fetchUserPosts.rejected, (state: State) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state: State, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      );
  },
});

export default postsSlice.reducer;
export const { setPost } = postsSlice.actions;
