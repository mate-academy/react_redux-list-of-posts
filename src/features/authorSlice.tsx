import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorState {
  data: User | null;
}

const initialState: AuthorState = {
  data: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state: AuthorState, action: PayloadAction<User>) => ({
      ...state,
      data: action.payload,
    }),
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
