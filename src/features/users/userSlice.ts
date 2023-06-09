import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../types/User';

type UsersState = {
  users: User[],
  loading: boolean,
  error: string,
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;

// export const init = createAsyncThunk('users/fetch', () => {
//   return fetchGoods();
// });
