import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  post: Post | null;
}

const initialState: SelectedPostState = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, post: action.payload };
    },
    clearSelectedPost: state => {
      return { ...state, post: null };
    },
  },
});

export const { selectPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
