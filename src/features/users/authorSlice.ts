import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type InitialState = User | null;

const initialState = null as InitialState;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User>) => action.payload,
    removeAuthor: () => null,
  },
});

export default authorSlice.reducer;

export const { removeAuthor, setAuthor } = authorSlice.actions;
