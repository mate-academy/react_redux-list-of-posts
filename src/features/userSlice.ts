import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  selectedUserId: number | null;
}

const initialState: State = {
  selectedUserId: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectUserId: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { selectUserId } = userSlice.actions;
