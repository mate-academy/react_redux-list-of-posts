import { User } from '../../types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthorState {
  user: User | null;
}

const initialState: AuthorState = {
  user: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export const selectAuthor = (state: RootState) => state.author.user;
export default authorSlice.reducer;
