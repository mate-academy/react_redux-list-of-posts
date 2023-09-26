import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = {
  selectedPost: Post | null;
};

const initialState: SelectedPost = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { set } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
