/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelecetedPostState {
  value: Post | null;
}

const initialState: SelecetedPostState = {
  value: null,
};

export const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post | null>) => {
      state.value = action.payload;
    },
  },
});

export const { addPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
