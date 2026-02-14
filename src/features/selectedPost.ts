import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
    clearSelectedPost: state => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
