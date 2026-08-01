import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = Post | null;

const initialState = null as SelectedPostState;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Post | null>) => action.payload,
  },
});

export const { set } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
