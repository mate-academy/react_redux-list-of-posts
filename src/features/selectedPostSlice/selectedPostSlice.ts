import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, post: action.payload };
    },
    clearSelectedPost: () => {
      return { post: null };
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
