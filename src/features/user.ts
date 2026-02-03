import { createSlice } from '@reduxjs/toolkit';
const initialState: number | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
