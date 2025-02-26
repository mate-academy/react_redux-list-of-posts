import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setUser } = authorSlice.actions;
