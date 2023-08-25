import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface UsersState {
  users: User[]
}

const initialState: UsersState = {
  users: [] as User[],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
