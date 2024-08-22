import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User[] = [];

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.pop();

      state.push(action.payload);
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
