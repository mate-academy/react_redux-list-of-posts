import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'currentPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
  },
});

export const { selectPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
