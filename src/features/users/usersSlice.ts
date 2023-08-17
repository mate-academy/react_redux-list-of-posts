import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  items: User[];
}

const initialState: UsersState = {
  items: [],
};

export const init = createAsyncThunk('fetch/users', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
    });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
