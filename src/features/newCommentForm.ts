import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
};

export const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setVisibility: (state, { payload }: PayloadAction<boolean>) => {
      return { ...state, visible: payload };
    },
  },
});

export const { setVisibility } = newCommentFormSlice.actions;
export default newCommentFormSlice.reducer;
