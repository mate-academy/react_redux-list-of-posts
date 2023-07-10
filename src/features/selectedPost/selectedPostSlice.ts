import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPostState,
  reducers: {
    setPost: (__, action) => {
      return action.payload;
    },
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
export const { setPost } = selectedPostSlice.actions;
