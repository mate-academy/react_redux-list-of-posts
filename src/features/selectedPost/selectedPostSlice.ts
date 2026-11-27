import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    postSelected: (_state, action: PayloadAction<Post | null>) =>
      action.payload,
  },
});

export const { postSelected } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
