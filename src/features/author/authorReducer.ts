import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type InitialState = {
  author: null | User,
};

const initialState: InitialState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'autor',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => ({
      ...state,
      author: action.payload,
    }),
  },
});

export const authorReducer = authorSlice.reducer;
export const actionAuthor = authorSlice.actions;
