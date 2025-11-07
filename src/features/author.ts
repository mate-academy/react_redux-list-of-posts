import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  selectedUser: User | null;
};

const initialState: AuthorState = {
  selectedUser: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User>) => ({
      selectedUser: action.payload,
    }),
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
