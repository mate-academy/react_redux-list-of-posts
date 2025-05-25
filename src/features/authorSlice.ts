import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
type InitialState = {
  value: User | null;
};

const initialState: InitialState = {
  value: null,
};

const authorSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    chooseAuthor: (state, action: PayloadAction<User | null>) => {
      return { ...state, value: action.payload };
    },
  },
});

export default authorSlice.reducer;
export const { chooseAuthor } = authorSlice.actions;
