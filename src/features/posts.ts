import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post[] | null;
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (_state, action: PayloadAction<Post[]>) => action.payload,
  },
});

export const { setPost } = postSlice.actions;
export default postSlice.reducer;
