import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User = {
  id: 777,
  name: 'select user',
  email: 'email',
  phone: 'phone',
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (
      _state: User,
      action: PayloadAction<User>,
    ) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;
