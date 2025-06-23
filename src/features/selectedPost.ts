import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;
const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<Post | null>) =>
      action.payload,
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
