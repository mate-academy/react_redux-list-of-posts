/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedPostState = {
  selectedPostId: number | null;
};

const initialState: SelectedPostState = {
  selectedPostId: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { selectPost } = selectedPostSlice.actions;
