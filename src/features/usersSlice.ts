import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    setError: (state, action: PayloadAction<string>) => {
      return { ...state, error: action.payload };
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      return { ...state, users: action.payload };
    },
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;
