import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorState {
  selectedAuthor: User | null,
}

const initialState: AuthorState = {
  selectedAuthor: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    selectAuthor: (state, action: PayloadAction<User>) => {
      const currentState = state;

      currentState.selectedAuthor = action.payload;
    },
  },
});

export const { selectAuthor } = authorSlice.actions;
export default authorSlice.reducer;
