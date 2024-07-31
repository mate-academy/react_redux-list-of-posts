import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialState = {
  author: User | null;
};

const initialState: InitialState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
