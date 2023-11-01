import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type State = {
  authorData: User | null,
};

const initialState: State = {
  authorData: null,
};

export const authorSlice = createSlice({
  name: 'authorSlice',
  initialState,
  reducers: {
    setAuthor: (state: State, action: PayloadAction<User | null>) => {
      // eslint-disable-next-line
      state.authorData = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
