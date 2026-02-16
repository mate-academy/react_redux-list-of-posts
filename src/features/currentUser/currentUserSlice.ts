import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

interface CurrentUserState {
  item: User | null;
}

const initialState: CurrentUserState = {
  item: null,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      /* eslint-disable no-param-reassign */
      state.item = action.payload;
    },
    clearCurrentUser: state => {
      state.item = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
