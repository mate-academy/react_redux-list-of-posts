import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = Post | null;

const initialState = null as SelectedPostState;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    select: (_, action: PayloadAction<Post>) => action.payload,
    deselect: () => null,
  },
});

export const { select, deselect } = selectedPostSlice.actions;
