/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
// eslint-disable-next-line import/no-cycle

export interface AuthorState {
  author: User | null;
  loading: boolean;
  error: string;
}

const initialState: AuthorState = {
  author: null,
  loading: false,
  error: '',
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
