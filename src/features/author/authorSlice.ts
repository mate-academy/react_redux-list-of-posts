import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = {
  author: User | null,
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    take: (
      state,
      action: PayloadAction<{ users: User[], selectedUserId: number }>,
    ) => {
      const { users, selectedUserId } = action.payload;
      const selectedUser = users.find(user => user.id === selectedUserId);

      if (selectedUser) {
        return {
          ...state,
          author: selectedUser,
        };
      }

      return state;
    },

    clear: () => {
      return initialState;
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
