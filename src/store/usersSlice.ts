import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const fetchUsers = createAsyncThunk<User[], void>(
  'users/fetchUsers',
  async () => {
    return getUsers();
  },
);

const initialState = {
  items: [] as User[],
  expanded: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setExpanded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      expanded: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
    }));
  },
});

export const { setExpanded } = usersSlice.actions;
