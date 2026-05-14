import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export const userSlice = createSlice({
  name: 'user',
  initialState: [] as User[],
  reducers: {
    setUsers: (_state, action) => action.payload,
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
