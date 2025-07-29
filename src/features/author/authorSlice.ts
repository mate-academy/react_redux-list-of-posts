import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  current: User | null;
}

const initialState: AuthorState = {
  current: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    // eslint-disable-next-line no-param-reassign
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.current = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
