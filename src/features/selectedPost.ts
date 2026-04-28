import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

export default selectedPostSlice.reducer;
export const { set } = selectedPostSlice.actions;
