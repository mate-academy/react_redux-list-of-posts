import { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../app/createAppSlice';
import { User } from '../../types/User';

export interface AuthorSliceState {
  author: User | null;
}

const initialState: AuthorSliceState = {
  author: null,
};

export const authorSlice = createAppSlice({
  name: 'author',
  initialState,
  reducers: create => ({
    setAuthor: create.reducer((state, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    }),
  }),
});
