import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

interface SelectedPostState {
  selectedPost: Post | null;
}

interface ActionSelectedPostReducer {
  payload: SelectedPostState;
}

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: {
    selectedPost: null,
  },
  reducers: {
    setSelectedPost(
      state: SelectedPostState,
      action: ActionSelectedPostReducer,
    ) {
      state.selectedPost = action.payload.selectedPost;
    },
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
