import { createSlice } from '@reduxjs/toolkit';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null,
  reducers: {
    setSelectedPost: (state, action) => action.payload,
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
