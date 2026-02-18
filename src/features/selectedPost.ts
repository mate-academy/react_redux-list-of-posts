import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    SET: (_, actions: PayloadAction<Post>) => actions.payload,
    REMOVE: () => null,
  },
});

export default selectedPostSlice.reducer;
