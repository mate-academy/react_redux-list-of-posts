import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const SelectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
  },
});

export const { setSelectedPost } = SelectedPostSlice.actions;
export default SelectedPostSlice.reducer;
