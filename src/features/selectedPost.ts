import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../types/Post';

type SelectedPostState = Post | null;

const initialState: SelectedPostState = null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (
      _state,
      action: PayloadAction<SelectedPostState>,
    ): SelectedPostState => action.payload,
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
