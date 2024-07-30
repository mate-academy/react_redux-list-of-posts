/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Post } from '../../../types/Post';

interface SelectedPostInterface {
  post: Post | null;
}

const initialState: SelectedPostInterface = {
  post: null,
};

export const selectedPostSlice: Slice<SelectedPostInterface> = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
