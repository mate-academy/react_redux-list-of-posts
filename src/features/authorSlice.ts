import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorStateType {
  author: User | null;
}

const initialState: AuthorStateType = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    addAuthor: (state, action: PayloadAction<User | null>) => {
      return {
        ...state,
        author: action.payload ? action.payload : state.author,
      };
    },
  },
});

export const { addAuthor } = authorSlice.actions;
export default authorSlice.reducer;
