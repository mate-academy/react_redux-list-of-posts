import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = null as Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (_state, action: PayloadAction<Post>) => {
      return action.payload;
    },
    clearPost: () => null,
  },
});

export const { setPost, clearPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
