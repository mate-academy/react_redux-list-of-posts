import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null;
  loading: boolean;
  hasError: boolean;
};

const initialState: AuthorState = {
  author: null,
  loading: false,
  hasError: false,
};

const authorSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },

    remove: state => {
      state.author = null;
    },
  },
});

export default authorSlice.reducer;
export const { set, remove } = authorSlice.actions;
