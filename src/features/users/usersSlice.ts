import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await getUsers();

    return response;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as User[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        // Return a new state object
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        // Return a new state object with updated values
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        // Return a new state object with error
        return {
          ...state,
          loading: false,
          error: action.error.message || 'Failed to fetch users',
        };
      });
  },
});

export default usersSlice.reducer;
