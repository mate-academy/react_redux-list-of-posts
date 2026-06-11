/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  selectedPostId: 0 as number,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPostId(state, action: PayloadAction<number>) {
      state.selectedPostId = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
