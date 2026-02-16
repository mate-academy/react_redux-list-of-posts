import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = {
  selectedPost: null as Post | null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, { payload }: PayloadAction<Post | null>) {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const SelectedPostActions = {
  ...selectedPostSlice.actions,
};
