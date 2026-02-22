import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';

export interface UserState {
  author: User | null;
}

const initialState: UserState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      /* eslint-disable no-param-reassign */
      state.author = action.payload;
    },
  },
});

export const selectAuthor = (state: RootState) => state.author;
export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
