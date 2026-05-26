/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HasError {
  hasError: boolean;
}

const initialState: HasError = {
  hasError: false,
};

const hasErrorSlice = createSlice({
  name: 'hasError',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export const { setError } = hasErrorSlice.actions;

export default hasErrorSlice.reducer;
