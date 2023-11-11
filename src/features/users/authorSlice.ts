/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  value: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthorState = {
  value: null,
  status: 'idle',
};

export const authorSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAuthorPost: (state, action: PayloadAction<User | null>) => {
      state.value = action.payload;
    },
  },
});

export default authorSlice.reducer;
