import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface CurrentUserState {
  selectedUser: User | null;
}

const initialState: CurrentUserState = {
  selectedUser: null,
};

export const authorSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        selectedUser: action.payload,
      };
    },
  },
});

export const { selectUser } = authorSlice.actions;

export default authorSlice.reducer;
