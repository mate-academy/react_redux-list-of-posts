import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
}

interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
      state.loaded = true;
    },
    setError: (state) => {
      state.hasError = true;
    },
  },
});

export const { setUsers, setError } = usersSlice.actions;
export default usersSlice.reducer;
