import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

interface SelectedPostState {
  selectedPost: Post | null;
}

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: {
    selectedPost: null,
  },
  reducers: {
    setSelectedPost(
      state: SelectedPostState,
      action: PayloadAction<{ selectedPost: Post }>,
    ) {
      state.selectedPost = action.payload.selectedPost;
    },
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
