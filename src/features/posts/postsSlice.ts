/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { ApiFeatureState } from '../../types/ApiFeatureState';
import { getUserPosts } from '../../api/posts';
import { RootState } from '../../app/store';

type State = ApiFeatureState<Post[]>;

const REDUCER_NAME = 'posts';

const initialState: State = {
  hasError: false,
  loaded: false,
  items: [],
};

const init = createAsyncThunk(
  `${REDUCER_NAME}/init`,
  async (userId: number) => {
    const result = await getUserPosts(userId);

    return result;
  },
);

export const postsSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, () => ({
      hasError: false,
      loaded: false,
      items: [],
    }));

    builder.addCase(init.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const selectors = {
  selectAll: (state: RootState) => state.posts,
};

export const actions = {
  ...postsSlice.actions,
  init,
};
