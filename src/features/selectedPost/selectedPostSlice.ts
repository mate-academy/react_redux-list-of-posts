import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = Post | null;

const initialState: SelectedPostState = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState as SelectedPostState,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<SelectedPostState>) => {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
