import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsersThunk } from '../../thunks/UsersThunks';

export interface UsersState {
  users: User[];
  expanded: boolean,
  author: User | null,
}

const initialState: UsersState = {
  users: [],
  expanded: false,
  author: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setExpanded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        expanded: action.payload,
      };
    },
    setAuthor: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        author: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
