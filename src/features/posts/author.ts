/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = {
  id: number,
  name: string,
  email: string;
  phone: string;
};

const initialState: AuthorState = {
  id: 0,
  name: '',
  email: '',
  phone: '',
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      const {
        id,
        name,
        email,
        phone,
      } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.phone = phone;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
