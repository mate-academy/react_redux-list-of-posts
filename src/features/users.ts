import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

interface UserState {
  fetched: boolean;
  users: User[];
  author: User | null;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  fetched: false,
  users: [],
  author: null,
  loading: false,
  error: '',
};

export const getAllUsers = createAsyncThunk(
  'users/fetch',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();

    if (state.users.fetched) {
      return rejectWithValue('Users already fetched');
    } else {
      if (state.users.users.length > 0) {
        return rejectWithValue('Users already loaded');
      }

      try {
        const response = await getUsers();

        return response;
      } catch (error) {
        throw new Error(`Problem with fetching users: ${error}`);
      }
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.fetched = true;
          state.error = '';
          state.loading = false;
          state.users = action.payload;
        },
      )
      .addCase(getAllUsers.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;

export const { setAuthor } = usersSlice.actions;
