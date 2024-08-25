import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    set: (_, action: PayloadAction<Post>) => action.payload,
    clear: () => null,
  },
});

export default selectedPostSlice.reducer;

export const { set, clear } = selectedPostSlice.actions;
