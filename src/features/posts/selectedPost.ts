import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    set: (_state, action) => action.payload,
  },
});

export default selectedPostSlice.reducer;
export const { set } = selectedPostSlice.actions;
