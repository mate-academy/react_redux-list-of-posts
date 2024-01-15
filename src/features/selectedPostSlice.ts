/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

interface State {
  selectedPost: Post | null,
}

const initialState: State = {
  selectedPost: null,
};

const selectedPost = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { set } = selectedPost.actions;
export default selectedPost.reducer;
