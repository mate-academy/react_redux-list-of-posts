import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
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
    selectUser(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { selectUser } = authorSlice.actions;
