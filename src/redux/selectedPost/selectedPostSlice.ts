/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface IInitialState {
  selectedPost: null | Post;
}

const initialState: IInitialState = {
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    addSelectedPost(state, action: PayloadAction<Post | null>) {
      state.selectedPost = action.payload;
    },
  },
});

export const { addSelectedPost } = postSlice.actions;
export default postSlice.reducer;
