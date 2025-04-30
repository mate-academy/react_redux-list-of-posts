import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommentsState = {
  items: [],
  loaded: true,
  hasError: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, loaded: action.payload };
    },
    setError: (state, action: PayloadAction<string>) => {
      return { ...state, hasError: action.payload };
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, items: action.payload };
    },
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;
