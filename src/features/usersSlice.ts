import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UserState = {
  users: User[],
};

const initialState: UserState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
