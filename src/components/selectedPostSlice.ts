import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type SelectedPostState = Post | null;

const initialState: SelectedPostState = null as SelectedPostState;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPostAction: (_, action: PayloadAction<Post | null>) =>
      action.payload,
  },
});

export const { setSelectedPostAction } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
