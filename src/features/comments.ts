import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentStatus = {
  comments: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommentStatus = {
  comments: [],
  loaded: false,
  hasError: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      const currentState = state;

      currentState.comments = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, loaded: action.payload };
    },

    setHasError: (state, action: PayloadAction<string>) => {
      return { ...state, hasError: action.payload };
    },
  },
});

export const { setComments, setLoaded, setHasError } = commentsSlice.actions;
export default commentsSlice.reducer;
