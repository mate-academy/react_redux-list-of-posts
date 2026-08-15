import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../../types/Post';

type SelectedPostState = Post | null;

const initialState = null as SelectedPostState;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (
      _state: SelectedPostState,
      action: PayloadAction<Post | null>,
    ) => action.payload,

    clearSelectedPost: () => null,
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
