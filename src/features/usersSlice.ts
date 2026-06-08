import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
  author: User | null;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
  author: null,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const data = await getUsers();

  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      return {
        ...state,
        author: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
        };
      })
      .addCase(fetchUsers.rejected, state => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      });
  },
});

export const { setAuthor } = usersSlice.actions;
export default usersSlice.reducer;
