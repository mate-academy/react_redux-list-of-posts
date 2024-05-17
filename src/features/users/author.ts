import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User = {
  id: 0,
  name: '',
  email: '',
  phone: '',
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    add: (_state, action: PayloadAction<User>) => action.payload,
  },
});

export default authorSlice.reducer;
export const { add } = authorSlice.actions;
