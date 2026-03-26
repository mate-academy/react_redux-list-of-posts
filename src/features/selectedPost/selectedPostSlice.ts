/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SelectedPostState {
  postId: number | null;
}

const initialState: SelectedPostState = {
  postId: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPostId: (state, action: PayloadAction<number | null>) => {
      state.postId = action.payload;
    },
  },
});

export const { setPostId } = selectedPostSlice.actions;
export const selectSelectedPostId = (state: RootState) =>
  state.selectedPost.postId;
export default selectedPostSlice.reducer;
