import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User = {
  id: 0,
  name: '',
  email: '',
  phone: '',
};

export const { reducer, actions } = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<User>) => action.payload,
  },
});
