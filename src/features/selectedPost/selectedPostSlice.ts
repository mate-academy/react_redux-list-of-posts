import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost(_state, { payload }: PayloadAction<Post | null>) {
      return payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setPost } = selectedPostSlice.actions;
