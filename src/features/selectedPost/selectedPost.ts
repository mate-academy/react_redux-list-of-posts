/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPost = {
  value: Post | null;
};

const initialState: SelectedPost = {
  value: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPostId: (state, action: PayloadAction<Post>) => {
      state.value = action.payload;
    },
    removePostId: () => ({ value: null }),
  },
});

export default selectedPostSlice.reducer;
export const { setPostId, removePostId } = selectedPostSlice.actions;
