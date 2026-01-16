import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    selectPost: (_state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const { selectPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
