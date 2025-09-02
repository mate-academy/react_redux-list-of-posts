import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { User } from '../../../types/User';

type UserState = User | null;

const initialState: UserState = null;

const authorSlice: Slice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action: PayloadAction) => {
      return action.payload;
    },
    removeAuthor: () => {
      return null;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor, removeAuthor } = authorSlice.actions;
