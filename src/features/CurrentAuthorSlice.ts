import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type CurrentAuthorState = {
  currentAuthor: User | null;
};

const initialState: CurrentAuthorState = {
  currentAuthor: null,
};

export const CurrentAuthorSlice = createSlice({
  name: 'currentAuthor',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User | null>) {
      return {
        ...state,
        currentAuthor: action.payload,
      };
    },
  },
});

export const { setAuthor } = CurrentAuthorSlice.actions;
export default CurrentAuthorSlice.reducer;
