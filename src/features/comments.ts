import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
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
    setCommentsSuccess: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      loaded: true,
      hasError: false,
      items: action.payload,
    }),
    setCommentsError: state => ({
      ...state,
      loaded: true,
      hasError: true,
      items: [],
    }),
    addComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    removeComment: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),
    resetComments: () => initialState,
  },
});

export const {
  setCommentsLoading,
  setCommentsSuccess,
  setCommentsError,
  addComment,
  removeComment,
  resetComments,
} = commentsSlice.actions;

export default commentsSlice.reducer;
