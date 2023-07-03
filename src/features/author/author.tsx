import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type Author = {
  author: User | null,
};

const initialState: Author = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state: Author, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
