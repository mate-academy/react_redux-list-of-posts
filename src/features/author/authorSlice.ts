/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { PayloadAction } from '@reduxjs/toolkit';

export interface AuthorState {
  currentUser: User | null;
}

const initialState: AuthorState = {
  currentUser: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
