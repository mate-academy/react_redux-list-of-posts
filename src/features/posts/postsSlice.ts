import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    get: () => {},
    create: () => {},
    delete: () => {},
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
