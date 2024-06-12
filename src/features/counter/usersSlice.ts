import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type State = {
  value: User[];
};

const initialState: State = {
  value: [],
};

// const getUsersAsync = createAsyncThunk('users/fetchUsers', () => {
//   return async () => {
//     const users = await getUsers();

//     return users;
//   };
// });

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const actions = usersSlice.actions;

export default usersSlice.reducer;
