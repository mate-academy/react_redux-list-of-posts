import { createSlice } from '@reduxjs/toolkit';
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
    addAuthor: (_author, action) => action.payload,
  },
});

export default authorSlice.reducer;
export const { addAuthor } = authorSlice.actions;
