import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type InitialState = {
  autor: null | User,
};

const initialState: InitialState = {
  autor: null,
};

const autorSlice = createSlice({
  name: 'autor',
  initialState,
  reducers: {
    setAutor: (state, action: PayloadAction<User | null>) => ({
      ...state,
      autor: action.payload,
    }),
  },
});

export const autorReduser = autorSlice.reducer;
export const actionAutor = autorSlice.actions;
