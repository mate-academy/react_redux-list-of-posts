import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  value: Post | null;
}

const initialState: SelectedPostState = {
  value: null,
};

export const selectedPost = createSlice({
  name: 'selectedPost',
  initialState: initialState,
  reducers: {
    selectPost: (state, action) => {
      /* eslint-disable no-param-reassign */
      state.value = action.payload;
    },
  },
});

export const { selectPost } = selectedPost.actions;

export default selectedPost.reducer;
