import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

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
    setCommentLoading: state => ({
      ...state,
      loaded: false,
      hasError: false,
    }),
    setCommentSuccess: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      loaded: true,
      hasError: false,
      items: action.payload,
    }),
    setCommentError: state => ({
      ...state,
      loaded: true,
      hasError: true,
      items: [],
    }),
    clearComment: () => ({
      loaded: false,
      hasError: false,
      items: [],
    }),
    addComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
  },
});

export const {
  setCommentLoading,
  setCommentSuccess,
  setCommentError,
  clearComment,
  addComment,
} = commentsSlice.actions;
export default commentsSlice.reducer;
