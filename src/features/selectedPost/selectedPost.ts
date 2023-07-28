/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = Post | null;

const initialState = null as SelectedPostState;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<SelectedPostState>) => {
      return action.payload;
    },
  },
});

export const { set } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
