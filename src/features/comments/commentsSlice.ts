import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    loaded: false,
    hasError: false,
    comments: [] as Comment[],
  },
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, loaded: action.payload };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return { ...state, hasError: action.payload };
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, comments: action.payload };
    },
  },
});

export const { setLoaded, setError, setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
