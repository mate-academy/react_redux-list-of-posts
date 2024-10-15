import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
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

export const selectedPostReducer = selectedPostSlice.reducer;
export const { setSelectedPost, clearPost } = selectedPostSlice.actions;
