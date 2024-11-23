import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from '../../types/User';

export interface AuthorState {
  selectedAuthor: User | null;
}

const initialState: AuthorState = {
  selectedAuthor: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.selectedAuthor = action.payload;
    }
  }
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;

