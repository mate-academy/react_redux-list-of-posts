import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type InitialState = {
  selectedPost: Post | null;
};

const initialState: InitialState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => ({ selectedPost: action.payload }),
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
