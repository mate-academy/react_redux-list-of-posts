import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UserState = {
  users: User[],
};

const InitialState: UserState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState: InitialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
