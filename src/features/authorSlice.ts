import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type State = User | null;

const authorState: State = null;

const authorSlice = createSlice({
  name: 'author',
  initialState: authorState as State,
  reducers: {
    setAuthor: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
