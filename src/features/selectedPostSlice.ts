/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null,
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, actions: PayloadAction<Post | null>) => {
      state.selectedPost = actions.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
