/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const postsSlice = createSlice({
  name: 'post',
  initialState: { value: [] } as {
    value: Post[];
  },
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.value = action.payload;
    },
  },
});

const { reducer, actions } = postsSlice;

export const postsReducer = reducer;
export const postsActions = actions;

export default postsSlice;
