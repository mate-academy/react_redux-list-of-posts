import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  user: User | null;
}

const initialState: AuthorState = {
  user: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<User | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
  },
});

export const { changeUser } = authorSlice.actions;
export default authorSlice.reducer;
