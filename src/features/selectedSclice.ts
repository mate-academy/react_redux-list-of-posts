import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export const selectSlice = createSlice({
  name: 'selected',
  initialState: null as Post | null,
  reducers: {
    setSelected(state, action: PayloadAction<Post | null>) {
      return action.payload;
    },
  },
});

export const { setSelected } = selectSlice.actions;
export default selectSlice.reducer;
