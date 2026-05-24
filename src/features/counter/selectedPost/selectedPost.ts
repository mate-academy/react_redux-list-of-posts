import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../types/Post';

type SelectedPostState = Post | null;
const initialState: SelectedPostState = null as SelectedPostState;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<Post>) => {
      return action.payload;
    },
    clearSelectedPost: () => {
      return null;
    },
  },
});
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
