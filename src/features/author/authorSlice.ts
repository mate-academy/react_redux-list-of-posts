/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface AuthorState {
  value: User | null;
}

const initialState: AuthorState = {
  value: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export const selectAuthor = (
  state: RootState,
): User | null => state.author.value;

export default authorSlice.reducer;
