import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

interface SelectedPostState {
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
      state.selectedPost = action.payload; // eslint-disable-line no-param-reassign
    },
    resetSelectedPost: state => {
      state.selectedPost = null; // eslint-disable-line no-param-reassign
    },
  },
});

export const { setSelectedPost, resetSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
