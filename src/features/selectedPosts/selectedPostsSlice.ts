/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface SelectedState {
  id: number | null;
}

const initialState: SelectedState = {
  id: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,

  reducers: {
    setSelectedPost(state, action: PayloadAction<number | null>) {
      state.id = action.payload;
    },
    clearSelectedPost(state) {
      state.id = null;
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
export const selectSelectedPostId = (state: RootState) => state.selectedPost.id;

export default selectedPostSlice.reducer;
