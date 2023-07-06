import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = {
  author: User | null,
};

const InitialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState: InitialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
