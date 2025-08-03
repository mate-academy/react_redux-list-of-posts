import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  current: User | null;
}

const initialState: AuthorState = {
  current: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User | null>) => {
      return {
        current: action.payload,
      };
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
