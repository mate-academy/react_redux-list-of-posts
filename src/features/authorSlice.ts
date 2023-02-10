/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface AuthorState {
  value: User | null
}

const initialState: AuthorState = {
  value: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User>) {
      state.value = action.payload;
    },
    removeAuthor(state) {
      state.value = null;
    },
  },
});

export const { setAuthor, removeAuthor } = authorSlice.actions;
export default authorSlice.reducer;
