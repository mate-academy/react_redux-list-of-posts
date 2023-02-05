/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  value: Post | null;
}

const initialState: SelectedPostState = {
  value: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;

export const selectSelectedPost = (
  state: RootState,
): Post | null => state.selectedPost.value;

export default selectedPostSlice.reducer;
