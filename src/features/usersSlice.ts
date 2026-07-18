import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  items: User[];
};

const initialState: UsersState = {
  items: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (users, action: PayloadAction<User[]>) => {
      // eslint-disable-next-line no-param-reassign
      users.items = [...users.items, ...action.payload];
    },
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
