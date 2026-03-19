import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User | null = null;

export const { reducer: authorReducer, actions: authorActions } = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_user, action) => action.payload,
  },
});
