import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/User';
import type { RootState } from '../../app/store';
import { loadUsers } from './Thunks';

type UsersState = {
  loading: boolean;
  users: User[];
  error: string;
  selectedUser: User | null;
};

const initialState: UsersState = {
  loading: false,
  users: [],
  error: '',
  selectedUser: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return {
        ...state,
        selectedUser: action.payload,
      };
    },
    clearUser(state) {
      return {
        ...state,
        selectedUser: null,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => ({
      ...state,
      error: '',
      loading: true,
    }));
    builder.addCase(loadUsers.fulfilled, (state, action) => ({
      ...state,
      users: action.payload,
      loading: false,
    }));
    builder.addCase(loadUsers.rejected, (state, action) => ({
      ...state,
      error: action.error.message || '',
      loading: false,
    }));
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectCurrentUser = (state: RootState) => state.users.selectedUser;
export const { setUser, clearUser } = usersSlice.actions;

export default usersSlice.reducer;
