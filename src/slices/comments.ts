import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsSliceType = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsSliceType = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export default commentsSlice.reducer;
export const { setItems, setError, setLoaded } = commentsSlice.actions;
