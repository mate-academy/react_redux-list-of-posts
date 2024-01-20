/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = {
  value: Post | null,
};

const initialState: SelectedPostState = {
  value: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const selectedPostActions = selectedPostSlice.actions;

export const selectedPostReducer = selectedPostSlice.reducer;
