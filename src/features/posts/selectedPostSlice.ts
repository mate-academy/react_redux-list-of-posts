import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const selectedPostSlice = createSlice({
  name: 'selectedPostId',
  initialState: null as number | null,
  reducers: {
    set: (state, action: PayloadAction<number | null>) => action.payload,
  },
});

export const { set: setSelectedPostId } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
