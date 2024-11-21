import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type Comments = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: Comments = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
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

export const { setItems, setLoaded, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
