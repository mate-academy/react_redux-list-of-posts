import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorState {
  currentAuthor: User | null;
}

const initialState: AuthorState = {
  currentAuthor: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentAuthor = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
