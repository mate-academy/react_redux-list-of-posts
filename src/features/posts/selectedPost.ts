/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SelectedPostState {
  selectedPost: number | null,
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<number | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
