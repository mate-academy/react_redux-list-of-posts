import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null,
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state: AuthorState, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
