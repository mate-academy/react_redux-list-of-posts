import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type State = User | null;

const initialState: State = null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, { payload: author }) => author,
  },

});

export default authorSlice.reducer;
export const { actions } = authorSlice;
