import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setCurrentAuthor: (state, action) => {
      return action.payload;
    },
  },
});
