import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorState {
  value: User | null;
}

const initialState: AuthorState = {
  value: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
