import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as number | null,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<number | null>) => {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
