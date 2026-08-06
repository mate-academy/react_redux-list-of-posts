import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
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
    addCommentToStore: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    removeCommentFromStore: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),
  },
});

export const {
  setComments,
  setCommentsLoaded,
  setCommentsError,
  addCommentToStore,
  removeCommentFromStore,
} = commentsSlice.actions;

export default commentsSlice.reducer;
