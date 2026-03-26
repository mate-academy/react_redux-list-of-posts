/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SelectionState {
  selectedUserId: number | null;
  selectedPostId: number | null;
}

const initialState: SelectionState = {
  selectedUserId: null,
  selectedPostId: null,
};

export const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
    },
    setSelectedPostId: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },
  },
});

export const { setSelectedUserId, setSelectedPostId } = selectionSlice.actions;

export const selectSelectedUserId = (state: RootState) =>
  state.selection.selectedUserId;
export const selectSelectedPostId = (state: RootState) =>
  state.selection.selectedPostId;

export default selectionSlice.reducer;
