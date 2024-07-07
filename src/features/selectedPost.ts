import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialSelectedPost: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialSelectedPost,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: action.payload };
    },
  },
});

export const { set } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
