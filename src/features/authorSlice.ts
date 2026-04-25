import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthorState {
  selectedUserId: number;
}

const initialState: AuthorState = {
  selectedUserId: 0,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<number>) => ({
      ...state,
      selectedUserId: action.payload,
    }),
  },
});

export const { setSelectedUserId } = authorSlice.actions;
export default authorSlice.reducer;
