import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUsers } from '../thunks/usersThunk';

type UsersState = {
  users: User[];
  loading: boolean;
  error: boolean;
  author: User | null;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false,
  author: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => ({
      ...state,
      author: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, state => ({
      ...state,
      loading: true,
    }));
    builder.addCase(fetchUsers.fulfilled, (state, action) => ({
      ...state,
      users: action.payload,
      loading: false,
    }));
    builder.addCase(fetchUsers.rejected, state => ({
      ...state,
      error: true,
      loading: false,
    }));
  },
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
