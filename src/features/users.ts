import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const fetchUsers = createAsyncThunk('users/fetch', getUsers);

type UsersState = {
  users: User[];
  author: User | null;
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  author: null,
  loading: false,
  error: '',
};

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
    builder.addCase(fetchUsers.pending, state => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    });

    builder.addCase(fetchUsers.rejected, state => {
      return {
        ...state,
        loading: false,
        error: 'Something went wrong',
      };
    });
  },
});

export default usersSlice.reducer;
export const { setAuthor } = usersSlice.actions;
