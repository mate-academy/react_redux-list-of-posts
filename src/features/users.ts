import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
});

export default usersSlice.reducer;
export const { set } = usersSlice.actions;
