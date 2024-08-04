import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  isLoading: boolean;
  isError: string;
  user: User | null;
};

const initialState: AuthorState = {
  isLoading: false,
  isError: '',
  user: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default authorSlice.reducer;

export const { set } = authorSlice.actions;
