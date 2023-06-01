import { createSlice } from '@reduxjs/toolkit';
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
    setPost(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
