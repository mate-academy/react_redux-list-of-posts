import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    get: () => {},
    create: () => {},
    delete: () => {},
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
