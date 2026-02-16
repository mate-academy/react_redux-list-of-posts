import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (_state, action) => action.payload,
  },
});

export default selectedPostSlice.reducer;
