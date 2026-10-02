import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
const slice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<Post | null>) =>
      action.payload,
  },
});

export const { setSelectedPost } = slice.actions;
export default slice.reducer;
