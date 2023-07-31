/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

interface AuthorState {
  data: User | null;
}

const initialState: AuthorState = {
  data: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    clear: (state) => {
      state.data = null;
    },
  },
});

export const { set } = authorSlice.actions;
export default authorSlice.reducer;
