/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  post: Post | null;
}

const initialState: SelectedPostState = {
  post: null,
};

export const { reducer, actions } = createSlice({
  name: 'selectPost',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
  },
});
