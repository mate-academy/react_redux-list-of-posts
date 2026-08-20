/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

type SelectedPostState = number | null;

const initialState: SelectedPostState = null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<number | null>) => {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;

export const selectSelectedPost = (state: RootState) => state.selectedPost;

export default selectedPostSlice.reducer;
