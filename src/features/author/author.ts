import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type InitialState = {
  author: User | null;
};

const initialState: InitialState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
