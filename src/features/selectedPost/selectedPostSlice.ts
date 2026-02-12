import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

interface SelectedPostState {
  post: Post | null;
}

const initialState: SelectedPostState = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<Post | null>) => ({
      post: action.payload,
    }),

    clearSelectedPost: () => ({
      post: null,
    }),
  },
});

export const { setSelectedPost, clearSelectedPost } =
  selectedPostSlice.actions;

export default selectedPostSlice.reducer;
export type { SelectedPostState };
