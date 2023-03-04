import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null,
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (value, action: PayloadAction<User | null>) => {
      return {
        ...value,
        author: action.payload,
      };
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
