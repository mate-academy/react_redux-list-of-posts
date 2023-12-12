import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const selectedPostState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: selectedPostState,
  reducers: {
    setSelectedPost: (
      state,
      action: PayloadAction<Post | null>,
    ) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
