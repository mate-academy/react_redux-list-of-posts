import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    authorSelected: (_state, action: PayloadAction<User | null>) =>
      action.payload,
  },
});

export const { authorSelected } = authorSlice.actions;
export default authorSlice.reducer;
