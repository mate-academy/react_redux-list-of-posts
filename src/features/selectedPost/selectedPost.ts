import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState: Post | null = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState as Post | null,
  reducers: {
    set(_, action: PayloadAction<Post | null>) {
      return action.payload;
    },
    clear() {
      return null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { set, clear } = selectedPostSlice.actions;
