/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/User';

type SelectedPost = {
  author: User | null;
};

const initialState: SelectedPost = {
  author: null,
};

const authorSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
