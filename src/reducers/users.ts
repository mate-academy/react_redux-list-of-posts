import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface State {
  users: User[];
}

const initialState: State = {
  users: [],
};

/* eslint-disable */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});
/* eslint-enable */

export default usersSlice.reducer;
export const { actions } = usersSlice;
