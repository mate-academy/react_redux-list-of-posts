/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AutorState {
  value: User | null,
  status: 'selected' | 'unselected'
}

const initialState: AutorState = {
  value: null,
  status: 'unselected',
};

const authorReducer = createSlice({
  name: 'autor',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.status = 'selected';
      state.value = action.payload;
    },
  },
});

export const { reducer } = authorReducer;
export const { setAuthor } = authorReducer.actions;
