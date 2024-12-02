import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
  error: string;
};

const initialState: UsersState = {
  users: [],
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    setError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
