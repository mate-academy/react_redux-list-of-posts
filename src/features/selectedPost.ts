/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = {
  value: Post | null;
};

const initialState: State = {
  value: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    clearSelection: state => {
      state.value = null;
    },
    setSelection: (state, action: PayloadAction<Post | null>) => {
      state.value = action.payload;
    },
  },
});
