/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = {
  author: User;
  loading: boolean;
  error: string;
};

const initialState: AuthorState = {
  author: {
    id: 0,
    name: '',
    email: '',
    phone: '',
  },
  loading: false,
  error: '',
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
