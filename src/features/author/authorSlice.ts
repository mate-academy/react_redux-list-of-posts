/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

export interface AuthorState {
  value: User | null,
}

const initialState: AuthorState = {
  value: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    changeAuthor: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { changeAuthor } = authorSlice.actions;
export default authorSlice.reducer;
export const selectAuthor = (state: RootState) => state.author.value;
