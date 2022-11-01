/* eslint no-param-reassign: ["error", { "props": false }] */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = {
  value: Post | null;
};

const initialState: SelectedPost = {
  value: null,
};

const selectedSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Post | null>) => {
      state.value = action.payload;
    },
  },
});

export default selectedSlice.reducer;
export const { setSelected } = selectedSlice.actions;
