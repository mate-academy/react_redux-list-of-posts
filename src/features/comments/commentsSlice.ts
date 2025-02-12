import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    loaded: false,
    hasError: false,
    items: [] as Comment[],
  },
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, loaded: action.payload };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return { ...state, hasError: action.payload };
    },
    setItems: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, items: action.payload };
    },
  },
});

export const { setLoaded, setError, setItems } = commentsSlice.actions;
export default commentsSlice.reducer;
