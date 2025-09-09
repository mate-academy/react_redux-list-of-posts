import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/User';
import type { RootState } from '../../app/store';

type SelectedUserState = {
  author: User | null;
};

const initialState: SelectedUserState = {
  author: null,
};

export const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User>) {
      return {
        ...state,
        author: action.payload,
      };
    },
    clearAuthor(state) {
      return {
        ...state,
        author: null,
      };
    },
  },
});

export const selectCurrentUser = (state: RootState) =>
  state.selectedUser.author;
export const { setAuthor, clearAuthor } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
