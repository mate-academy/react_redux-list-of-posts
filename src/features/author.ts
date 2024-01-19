import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface UsersState {
  author: User | null,
}

const initialState: UsersState = {
  author: null,
};

const autorSlice = createSlice({
  name: 'autor',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    },
  },
});

export const { setAuthor } = autorSlice.actions;
export default autorSlice.reducer;
