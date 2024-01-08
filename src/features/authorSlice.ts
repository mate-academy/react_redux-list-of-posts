import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialState = {
  author: User | null,
};

const initialState: InitialState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
