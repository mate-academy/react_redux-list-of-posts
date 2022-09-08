import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { User } from '../types/User';

interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

export const authorStateSlice = createSlice({
  name: 'authorState',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    unselectUser: (state) => {
      state.author = null;
    },
  },
});

export const {
  setUser,
  unselectUser,
} = authorStateSlice.actions;

export const authorSelector = (state: RootState) => state.authorState.author;

export default authorStateSlice.reducer;
