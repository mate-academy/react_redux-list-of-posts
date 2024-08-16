import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
const initialState: Post | null = null;

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (_state, action) => action.payload,
    clearPost: () => initialState,
  },
});

export const { actions } = postSlice;
export default postSlice.reducer;
