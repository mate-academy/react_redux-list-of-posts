import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const SelectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
    clearPost: state => {
      return {
        ...state,
        selectedPost: null,
      };
    },
  },
});

export const { setPost, clearPost } = SelectedPostSlice.actions;
export default SelectedPostSlice.reducer;
