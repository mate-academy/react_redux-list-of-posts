/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  isSidebarOpen: boolean;
  isFormOpen: boolean;
}

const initialState = {
  isSidebarOpen: false,
  isFormOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarStatus: (state: UIState, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setFormStatus: (state: UIState, action: PayloadAction<boolean>) => {
      state.isFormOpen = action.payload;
    },
  },
});

export const { setSidebarStatus, setFormStatus } = uiSlice.actions;

export default uiSlice.reducer;
