// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { User } from '../types/User';
// import { getUser } from '../api/users';

// const initialState: User | null = null;

// export const setAuthor = createAsyncThunk<User | null, number>(
//   'author/fetch',
//   (id: number) => getUser(id),
// );

// export const authorSlice = createSlice({
//   name: 'author',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder.addCase(setAuthor.fulfilled, (state, action) => {
//       state = action.payload;
//     });
//   },
// });

// export default authorSlice.reducer;
