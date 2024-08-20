import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorType = {
  author: User | null;
};

const initialState: AuthorType = { author: null };

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<User>) => ({
      ...state,
      author: action.payload,
    }),
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
