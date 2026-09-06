import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  value: Post | null;
}

const initialState: SelectedPostState = {
  value: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      /*eslint-disable*/
      state.value = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
