/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const postSlice = createSlice({
  name: 'post',
  initialState: { post: null } as { post: null | Post },
  reducers: {
    setPost(state, action: PayloadAction<Post | null>) {
      state.post = action.payload;
    },
  },
});

const { reducer, actions } = postSlice;

export const postReducer = reducer;
export const postActions = actions;

export default postSlice;
