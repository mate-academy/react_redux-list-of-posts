import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = User | null;
const initialState = null as AuthorState;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(_state: AuthorState, action: PayloadAction<User | null>) {
      return action.payload;
    },
    clearAuthor() {
      return null;
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;
export default authorSlice.reducer;
