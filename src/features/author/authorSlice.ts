import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = {
  selected: User | null;
};

const initialState: AuthorState = {
  selected: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      return {
        ...state,
        selected: action.payload,
      };
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
