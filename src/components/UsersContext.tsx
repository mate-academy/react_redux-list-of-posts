// import React, { useEffect, useState } from 'react';
// import { getUsers } from '../api/users';
// import { User } from '../types/User';

// export const UserContext = React.createContext<User[]>([]);

// type Props = {
//   children: React.ReactNode;
// };

// export const UsersProvider: React.FC<Props> = ({ children }) => {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     getUsers().then(setUsers);
//   }, []);

//   return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
// };

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getUsers } from '../api/users';
// import { User } from '../types/User';

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await getUsers();
//   return response;
// });

// interface UsersState {
//   users: User[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UsersState = {
//   users: [],
//   loading: false,
//   error: null,
// };

// const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state) => {
//         state.loading = false;
//         state.error = 'Failed to load users';
//       });
//   },
// });

// export default usersSlice.reducer;
// export const usersReducer = usersSlice.reducer;
