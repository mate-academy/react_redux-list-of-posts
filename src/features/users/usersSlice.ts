import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UsersType = {
  users: User[];
};

const initialState: UsersType = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => ({
      ...state,
      users: action.payload,
    }),
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
