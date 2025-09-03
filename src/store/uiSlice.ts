/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '../types/UIState';

const initialState: UIState = {
  selectedUserId: null,
  selectedPostId: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<number | null>) {
      state.selectedUserId = action.payload;
      state.selectedPostId = null;
    },
    selectPost(state, action: PayloadAction<number | null>) {
      state.selectedPostId = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export const selectSelectedUserId = (state: { ui: UIState }) =>
  state.ui.selectedUserId;
export const selectSelectedPostId = (state: { ui: UIState }) =>
  state.ui.selectedPostId;
export default uiSlice.reducer;
