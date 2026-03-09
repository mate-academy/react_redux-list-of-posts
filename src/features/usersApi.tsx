import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersLoad = {
    data : User [];
}

const initialState: UsersLoad = {
    data: [],
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();
    return users;
  }
);


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers : {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state,action) => {
                state.data = action.payload;                
            })
    }
})

export default usersSlice.reducer;
