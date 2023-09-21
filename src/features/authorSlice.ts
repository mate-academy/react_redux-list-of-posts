import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface UserState {
  author: User | null;
}

const initialState: UserState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        author: action.payload,
      };
    },
    clearAuthor: (state) => {
      return {
        ...state,
        currentUser: null,
      };
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
