import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export type SelectedPostType = Post | null;

const initialState: SelectedPostType =
  null satisfies SelectedPostType as SelectedPostType;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectedPostReducer: (_state, action: PayloadAction<SelectedPostType>) =>
      action.payload,
  },
});

export const { selectedPostReducer } = selectedPostSlice.actions;
