/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../../types/Post';

const initialState = {
  selectedPost: null as null | Post,
};

export const selectedPostSLice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSLice.actions;
export default selectedPostSLice.reducer;
