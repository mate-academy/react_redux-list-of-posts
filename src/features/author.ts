import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface CurrentUserState {
  author: User | null;
}

const initialState: CurrentUserState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    selectedUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        author: action.payload,
      };
    },
  },
});

export const { selectedUser } = authorSlice.actions;

export default authorSlice.reducer;
