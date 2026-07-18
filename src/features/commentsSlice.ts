import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    startLoading: comments => ({
      ...comments,
      items: [],
      loaded: false,
      hasError: false,
      visible: false,
    }),
    setComments: (comments, action: PayloadAction<Comment[]>) => ({
      ...comments,
      items: action.payload,
      loaded: true,
      hasError: false,
    }),
    addComment: (comments, action: PayloadAction<Comment>) => {
      comments.items.push(action.payload);
    },
    deleteComment: (comments, action: PayloadAction<number>) => ({
      ...comments,
      items: comments.items.filter(comment => comment.id !== action.payload),
    }),
    setCommentsError: comments => ({
      ...comments,
      items: [],
      loaded: true,
      hasError: true,
    }),
  },
});

export default commentsSlice.reducer;
export const {
  setComments,
  addComment,
  deleteComment,
  startLoading,
  setCommentsError,
} = commentsSlice.actions;
