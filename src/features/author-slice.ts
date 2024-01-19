import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface State {
  author: User | null;
}

const initialState: State = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
