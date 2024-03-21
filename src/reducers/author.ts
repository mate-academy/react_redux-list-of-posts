import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface State {
  author: User | null;
}

const initialState: State = {
  author: null,
};

/* eslint-disable */
const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    clear: state => {
      state.author = null;
    },
  },
});
/* eslint-enable */

export default authorSlice.reducer;
export const { actions } = authorSlice;
