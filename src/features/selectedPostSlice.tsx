import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      return { ...state, selectedPost: action.payload };
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
