import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  user: User | null;
};

const initialState: AuthorState = {
  user: null,
};

export const usersSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { setAuthor } = usersSlice.actions;
