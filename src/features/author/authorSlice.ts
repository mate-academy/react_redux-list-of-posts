import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export type AuthorState = {
  author: User | null
};

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<User>) => {
      return { author: action.payload };
    },
  },
});

export const { actions } = authorSlice;
export default authorSlice.reducer;
