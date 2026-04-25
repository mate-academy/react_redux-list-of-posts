import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsLoading: state => ({
      ...state,
      loaded: false,
      hasError: false,
    }),
    setComments: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      items: action.payload,
      loaded: true,
      hasError: false,
    }),
    setCommentsError: state => ({
      ...state,
      hasError: true,
      loaded: true,
    }),
    addComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    deleteComment: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),
  },
});

export const {
  setComments,
  setCommentsError,
  setCommentsLoading,
  addComment,
  deleteComment,
} = commentsSlice.actions;
export default commentsSlice.reducer;
