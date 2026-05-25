import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // eslint-disable-line no-param-reassign
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
