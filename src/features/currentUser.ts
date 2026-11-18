import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type CurrentUserState = User | null;

const initialState: CurrentUserState = null;

const currentUserSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const { setAuthor: setCurrentUser } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
