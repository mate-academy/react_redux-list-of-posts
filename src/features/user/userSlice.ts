import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UserState = {
  user: User | null,
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clear: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { set, clear } = userSlice.actions;
