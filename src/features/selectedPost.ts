/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = {
  value: Post | null;
};

const initialState: State = {
  value: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Post>) => {
      state.value = payload;
    },
    clear: state => {
      state.value = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const actions = selectedPostSlice.actions;
