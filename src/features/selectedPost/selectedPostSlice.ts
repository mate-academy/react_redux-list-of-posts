/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostReducer {
  value: Post | null,
  status: 'selected' | 'unselected'
}

const initialState: SelectedPostReducer = {
  value: null,
  status: 'unselected',
};

const selectedPostReducer = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.status = 'selected';
      state.value = action.payload;
    },
    unsetPost: (state) => {
      state.status = 'unselected';
      state.value = null;
    },
  },
});

export const { reducer } = selectedPostReducer;
export const { setPost, unsetPost } = selectedPostReducer.actions;
