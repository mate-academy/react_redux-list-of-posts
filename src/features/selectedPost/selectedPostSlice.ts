/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { SelectedStatus } from '../../types/SelectedStatus';

export interface SelectedPostReducer {
  value: Post | null,
  status: SelectedStatus
}

const initialState: SelectedPostReducer = {
  value: null,
  status: SelectedStatus.UNSELECTED,
};

const selectedPostReducer = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.status = SelectedStatus.SELECTED;
      state.value = action.payload;
    },
    unsetPost: (state) => {
      state.status = SelectedStatus.UNSELECTED;
      state.value = null;
    },
  },
});

export const { reducer } = selectedPostReducer;
export const { setPost, unsetPost } = selectedPostReducer.actions;
