import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload; // eslint-disable-line no-param-reassign
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
