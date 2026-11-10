import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    set: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

export const { set: setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
