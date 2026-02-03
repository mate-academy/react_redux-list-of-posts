import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: null as number | null,
  reducers: {
    selectPost: (_, action: PayloadAction<number | null>) => action.payload,
    clearSelectedPost: () => null,
  },
});

export const { selectPost, clearSelectedPost } = postSlice.actions;
export default postSlice.reducer;
