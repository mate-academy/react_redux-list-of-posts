import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

interface AuthorState {
  item: User | null;
}

const initialState: AuthorState = {
  item: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action) {
      return { ...state, item: action.payload };
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
