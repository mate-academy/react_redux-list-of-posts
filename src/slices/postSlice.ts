/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type StateProps = {
  items: Post[];
  hasError: boolean;
  loaded: boolean;
};

const initialState: StateProps = {
  items: [],
  hasError: false,
  loaded: false,
};

export const fetchUserPosts = createAsyncThunk<Post[], number>(
  'posts/fetchUserPosts',
  async (id: number) => {
    try {
      const response = await getUserPosts(id);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchUserPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postSlice.reducer;
