/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface AuthorState {
  author: User | null;
  loading: boolean;
  hasError: string;
}

const initialState: AuthorState = {
  author: null,
  loading: false,
  hasError: '',
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

// export const author = (state: RootState) => state.author;
export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
