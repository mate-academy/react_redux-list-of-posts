import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { User } from '../types/User';

export type UserState = {
  author: User | null;
};

const initialState: UserState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      const currentState = state;

      currentState.author = action.payload;
    },
  },
});

export const selectAuthor = (state: RootState) => state.user.author;
export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
