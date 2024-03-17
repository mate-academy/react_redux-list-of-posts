import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../types/User';

export interface AuthorStateType {
  author: User | null;
}

const initialState: AuthorStateType = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    },
  },
});

export default authorSlice.reducer;
export const { set } = authorSlice.actions;
