import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AthorState {
  author: User | null;
}

const initialState: AthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addAuthor: (state: AthorState, action: PayloadAction<User>) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
    removeAuthor: (state: AthorState) => {
      // eslint-disable-next-line no-param-reassign
      state.author = null;
    },
  },
});

export const { addAuthor, removeAuthor } = authorSlice.actions;
export default authorSlice.reducer;
