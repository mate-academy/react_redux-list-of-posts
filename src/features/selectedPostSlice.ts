import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = Post | null;

const initialState: SelectedPostState = null as SelectedPostState;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post>) => action.payload,
    clearSelectedPost: () => null,
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
