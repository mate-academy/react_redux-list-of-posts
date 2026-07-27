import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { User } from "../../types/User"
import { getUsers } from "../../api/users";


const initialState = [] as User[];

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
   async() =>{
   return await getUsers();
   }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;
