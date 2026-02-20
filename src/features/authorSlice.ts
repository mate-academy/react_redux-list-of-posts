import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialState = null | User;

const initialState: InitialState = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialState,
  reducers: {
    setAuthor: (_, action) => action.payload,
  },
});
