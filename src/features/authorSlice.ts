import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type State = {
  value: User | null;
};

const initialState: State = {
  value: null,
};

export const authorSlice = createSlice({
  name: 'author',

  initialState,

  reducers: {
    set: (state, action: PayloadAction<User>) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
    clear: state => {
      // eslint-disable-next-line no-param-reassign
      state.value = null;
    },
  },
});

export const actions = authorSlice.actions;

export default authorSlice.reducer;
