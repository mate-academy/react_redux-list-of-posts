/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = {
  currentPost: Post | null;
};

const initialState: State = {
  currentPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state: State, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { set } = selectedPostSlice.actions;
