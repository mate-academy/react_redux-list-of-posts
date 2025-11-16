import { createSlice } from '@reduxjs/toolkit';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: 0,
  reducers: {
    setSelectedPost: (_state, action) => action.payload,
    clearSelectedPost: () => 0,
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
