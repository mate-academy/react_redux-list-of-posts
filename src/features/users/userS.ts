import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
  useR: User | null,
};

const initialState: UsersState = {
  users: [],
  useR: null,
};

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        useR: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    });
  },
});

export default usersSlice.reducer;

export const { selectUser } = usersSlice.actions;
