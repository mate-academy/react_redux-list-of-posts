import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState = {
  items: [] as User[],
  loaded: false,
  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
