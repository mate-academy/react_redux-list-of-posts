import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../../types/Post';

type SelectedPostState = Post | null;

const initialState: SelectedPostState = null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState as SelectedPostState,
  reducers: {
    setSelectedPost: (
      _state: SelectedPostState,
      action: PayloadAction<SelectedPostState>,
    ) => action.payload,

    clearSelectedPost: () => null,
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
