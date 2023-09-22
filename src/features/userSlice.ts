import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
});

export default userSlice.reducer;
export const { setUsers } = userSlice.actions;

export const loadUsers = () => {
  return async (dispatch: Dispatch) => {
    const response = await getUsers();

    dispatch(setUsers(response));
  };
};
