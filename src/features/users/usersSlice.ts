/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { RootState, AppThunk } from '../../app/store';
import { User } from '../../types/User';

export interface UsersState {
  users: User[],
  author: User | null,
}

const initialState: UsersState = {
  users: [],
  author: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },

    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const { setAuthor, setUsers } = usersSlice.actions;

export default usersSlice.reducer;
