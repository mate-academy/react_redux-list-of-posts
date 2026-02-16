import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = {
  selectedPost: null as Post | null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, { payload }: PayloadAction<Post | null>) {
      const currentState = state;

      currentState.selectedPost = payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const SelectedPostActions = {
  ...selectedPostSlice.actions,
};
