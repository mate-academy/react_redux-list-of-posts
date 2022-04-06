/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { fetchUsers } from './ActionCreators';

export interface UserState {
  users: User[];
  areUsersLoading: boolean;
  errorLoadingUsers: string;
  count: number;
  selectedUserId: number | undefined;
}

const initialState: UserState = {
  users: [],
  areUsersLoading: false,
  errorLoadingUsers: '',
  count: 0,
  selectedUserId: undefined,
};

export const userSlice: Slice<UserState> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUserId(state, action: PayloadAction<number>) {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.areUsersLoading = false;
      state.errorLoadingUsers = '';
      state.users = action.payload;
    },
    [fetchUsers.pending.type]: (state) => {
      state.areUsersLoading = true;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.areUsersLoading = false;
      state.errorLoadingUsers = action.payload;
    },
  },
});

export default userSlice.reducer;
