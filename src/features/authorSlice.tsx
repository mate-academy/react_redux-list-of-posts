import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = {
  author: {} as User,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      return { ...state, author: action.payload };
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
