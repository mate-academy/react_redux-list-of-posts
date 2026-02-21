import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },

    setComments: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };
    },

    setError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },

    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
