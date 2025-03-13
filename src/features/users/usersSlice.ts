/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.push(...action.payload);
    },
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
