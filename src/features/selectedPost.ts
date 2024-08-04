import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice: Slice<SelectedPostState> = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    openSelectedPost: (state, action: PayloadAction<Post>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },

    closeSelectedPost: () => initialState,
  },
});

export default selectedPostSlice.reducer;
export const { openSelectedPost, closeSelectedPost } =
  selectedPostSlice.actions;
