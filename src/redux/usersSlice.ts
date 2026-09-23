import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface UserState {
  items: User[];
}

const initialState: UserState = {
  items: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
