import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const authorReducer = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      return action.payload;
    },

    cleanAuthor: () => {
      return null;
    },
  },
});

export const { setAuthor, cleanAuthor } = authorReducer.actions;
export default authorReducer.reducer;
