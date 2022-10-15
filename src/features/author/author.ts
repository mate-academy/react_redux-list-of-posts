import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface InitialState {
  author: User | null,
  status: 'idle' | 'failed' | 'pending' | 'fullfilled',
  error: string | null;
}

const initialState: InitialState = {
  author: null,
  status: 'idle',
  error: 'error',
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    changeAuthor: (state, action: PayloadAction<User>) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export const { changeAuthor } = authorSlice.actions;
export default authorSlice.reducer;
