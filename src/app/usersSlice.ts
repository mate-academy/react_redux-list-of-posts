import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface UsersState {
  items: User[];
  author: User | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  author: null,
  loaded: false,
  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state: UsersState, action: PayloadAction<User[]>) => ({
      ...state,
      items: action.payload,
      loaded: true,
    }),
    setAuthor: (state: UsersState, action: PayloadAction<User | null>) => ({
      ...state,
      author: action.payload,
    }),
    setError: (state: UsersState) => ({
      ...state,
      hasError: true,
      loaded: true,
    }),
    setLoading: (state: UsersState) => ({
      ...state,
      loaded: false,
      hasError: false,
    }),
  },
});

export const { setUsers, setAuthor, setError, setLoading } = usersSlice.actions;
export default usersSlice.reducer;
