/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { SelectedStatus } from '../../types/SelectedStatus';

export interface AutorState {
  value: User | null,
  status: SelectedStatus
}

const initialState: AutorState = {
  value: null,
  status: SelectedStatus.UNSELECTED,
};

const authorReducer = createSlice({
  name: 'autor',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.status = SelectedStatus.SELECTED;
      state.value = action.payload;
    },
  },
});

export const { reducer } = authorReducer;
export const { setAuthor } = authorReducer.actions;
