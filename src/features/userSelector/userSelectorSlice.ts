import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSelectorSlice = createSlice({
  name: 'userSelector',
  initialState: {
    error: '',
  },
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { setError } = userSelectorSlice.actions;
