import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type State = {
  users: User[];
};

const initialState: State = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User[]>) => {
      return {
        ...state,
        users: [...state.users, ...action.payload
          .slice(0, 9),
        ],
      };
    },
  },
});

export const { addUser } = userSlice.actions;
export const selectUsers = (state: { user: State }) => state.user.users;

export default userSlice.reducer;
