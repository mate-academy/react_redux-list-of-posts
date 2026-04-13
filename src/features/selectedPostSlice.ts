import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { RootState } from '../app/store';

const initialState = null as Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectPost: (_state, { payload }: PayloadAction<Post | null>) => {
      return payload;
    },
  },
});

export const { setSelectPost } = selectedPostSlice.actions;
export const selectSelectedPost = (state: RootState) => state.selectedPost;
export default selectedPostSlice.reducer;
