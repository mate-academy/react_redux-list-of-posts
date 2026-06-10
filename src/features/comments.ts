import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

const initialState: { items: Comment[]; loaded: boolean; hasError: boolean } = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      return { ...state, items: action.payload };
    },
    setLoaded: (state, action) => {
      return { ...state, loaded: action.payload };
    },
    setError: (state, action) => {
      return { ...state, hasError: action.payload };
    },
  },
});

export const { setComments, setLoaded, setError } = commentsSlice.actions;

export default commentsSlice.reducer;
