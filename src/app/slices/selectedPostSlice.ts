import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  id: number | null;
};

const initialState: InitialState = {
  id: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.id = action.payload;
    },
    clearSelectedPost: state => {
      // eslint-disable-next-line no-param-reassign
      state.id = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
