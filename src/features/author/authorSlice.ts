/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

type InitialStateType = {
  author: User | null;
};

const initialState: InitialStateType = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setCurrentAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export const { setCurrentAuthor } = authorSlice.actions;
export default authorSlice.reducer;
export const author = (state: RootState) => state.author.author;
