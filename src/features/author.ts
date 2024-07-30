import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorSlice = {
  selectedAuthor: User | null;
};

const initialState: AuthorSlice = {
  selectedAuthor: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        selectedAuthor: action.payload,
      };
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
export const { setAuthor } = authorSlice.actions;
