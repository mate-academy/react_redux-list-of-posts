import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setUser(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setUser } = authorSlice.actions;
