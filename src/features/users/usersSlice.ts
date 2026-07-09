import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
  loaded: boolean;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
  },
});

export const { setUsers, setLoaded } = userSlice.actions;
export default userSlice.reducer;
