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
    setComments: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      items: action.payload,
    }),
    setCommentsLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    setCommentsError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
  },
});

export const { setComments, setCommentsLoaded, setCommentsError } =
  commentsSlice.actions;
