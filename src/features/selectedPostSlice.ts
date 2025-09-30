import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export const selectedPostSlice = createSlice({
  name: 'selected',
  initialState: null as Post | null,
  reducers: {
    setSelected(state, action: PayloadAction<Post | null>) {
      return action.payload;
    },

    clearSelected() {
      return null;
    },
  },
});

export const { setSelected, clearSelected } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
