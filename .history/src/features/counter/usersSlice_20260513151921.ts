import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UsersState {
  users: string[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default userSlice.reducer;


export const init = createAsyncThunk
