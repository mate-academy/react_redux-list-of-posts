import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UsersState = {
  items: User[];
};

const initialState: UsersState = {
  items: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => ({
      ...state,
      items: action.payload,
    }),
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
