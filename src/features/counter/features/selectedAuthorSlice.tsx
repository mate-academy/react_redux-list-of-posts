/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/User';

interface SetAuthorInterface {
  item: User | null;
}

const initialState: SetAuthorInterface = {
  item: null,
};

export const selectedAuthorPost = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.item = action.payload;
    },
  },
});

export const { setAuthor } = selectedAuthorPost.actions;
export default selectedAuthorPost.reducer;
