import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User>) {
      // Return a new state object instead of mutating `state`
      return {
        ...state,
        author: action.payload,
      };
    },
    clearAuthor(state) {
      // Return a new state object with `author` set to null
      return {
        ...state,
        author: null,
      };
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;

export default authorSlice.reducer;
