import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { Post } from '../../types/Post';

const initialState = {
  value: null as Post | null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
