import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = {
  selectedPost: null as null | Post,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
