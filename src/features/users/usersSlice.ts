import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers, getUser } from '../../api/users';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
  selectedUser: User | null;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedUser: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();

  return response;
});

export const fetchSelectedUser = createAsyncThunk(
  'users/fetchSelectedUser',
  async (userId: number) => {
    const response = await getUser(userId);

    return response;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      return { ...state, selectedUser: action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        return { ...state, loaded: false, hasError: false };
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        return { ...state, loaded: true, items: action.payload };
      })
      .addCase(fetchUsers.rejected, state => {
        return { ...state, loaded: false, hasError: true };
      })
      .addCase(fetchSelectedUser.pending, state => {
        return { ...state, loaded: false, hasError: false };
      })
      .addCase(
        fetchSelectedUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          return { ...state, loaded: true, selectedUser: action.payload };
        },
      )
      .addCase(fetchSelectedUser.rejected, state => {
        return { ...state, loaded: false, hasError: true };
      });
  },
});

export const { setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
