import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UserSlice = {
  currentUser: User | null,
};

const initialState: UserSlice = {
  currentUser: null,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload || null; // eslint-disable-line
    },
  },
});

export const { setUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
