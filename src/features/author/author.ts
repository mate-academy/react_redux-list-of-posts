/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = {
  selectedUser: User | null;
};

const initialState: AuthorState = {
  selectedUser: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setUser } = authorSlice.actions;
