import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type ItinialState = {
  author: User | null;
};

const initialState: ItinialState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => ({
      author: action.payload,
    }),
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
