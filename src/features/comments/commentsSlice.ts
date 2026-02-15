/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommentsState {
  isVisible: boolean;
}

const initialState = {
  isVisible: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setIsVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setIsVisible } = commentsSlice.actions;
export default commentsSlice.reducer;
