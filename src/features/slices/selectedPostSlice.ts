import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (
      state: SelectedPostState,
      action: PayloadAction<Post | null>,
    ) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { actions } = selectedPostSlice;
