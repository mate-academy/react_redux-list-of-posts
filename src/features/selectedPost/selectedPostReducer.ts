import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
type SelectedPostState = Post | null;
const initialState = null as SelectedPostState;
const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post>) {
      return action.payload;
    },
    clearSelectedPost() {
      return null;
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
