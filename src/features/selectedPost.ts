import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    add: (__, action: PayloadAction<Post>) => {
      return action.payload;
    },
    remove: () => null,
  },
});

export default selectedPostSlice.reducer;
