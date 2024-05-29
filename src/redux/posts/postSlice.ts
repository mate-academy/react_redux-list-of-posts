/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUsersPosts } from './operations';

export interface IInitialState {
  loaded: boolean;
  hasError: boolean;
  items: null | Post[];
}

const initialState: IInitialState = {
  loaded: false,
  hasError: false,
  items: null,
};

const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUsersPosts.pending, state => {
      state.loaded = true;
    });
    builder.addCase(getUsersPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(getUsersPosts.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export default postSlice.reducer;
