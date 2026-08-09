import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { User } from '../../types/User';

const initialState = {
  items: [] as User[],
};

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default usersReducer.reducer;
export const { setUsers } = usersReducer.actions;
