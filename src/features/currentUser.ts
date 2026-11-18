import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type CurrentUserState = {
  author: User | null;
};

const initialState: CurrentUserState = {
  author: null,
};

const currentUserSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export const { setAuthor: setCurrentUser } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
