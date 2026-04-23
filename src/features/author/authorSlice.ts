import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User>) => action.payload,
    clearAuthor: () => null,
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;

export const changeAuthor = (user: User) => {
  return (dispatch: Dispatch) => dispatch(setAuthor(user));
};
