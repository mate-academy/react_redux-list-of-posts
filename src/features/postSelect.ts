import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export const postSelectSlice = createSlice({
  name: 'postSelect',
  initialState: {} as Post,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => action.payload,
  },
});

export const { setPost } = postSelectSlice.actions;
export default postSelectSlice.reducer;
