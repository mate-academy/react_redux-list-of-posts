import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState: Post | null = null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
    clear: () => null,
  },
});

export default selectedPostSlice.reducer;

export const { set, clear } = selectedPostSlice.actions;
