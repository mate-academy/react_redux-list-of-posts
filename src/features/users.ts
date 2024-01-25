import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type State = User[];

const initialState: State = [];

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    loadUsers: (_state, action: PayloadAction<User []>) => action.payload,
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
