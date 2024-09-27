import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchCommentsStart: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    fetchCommentsSuccess: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      comments: action.payload,
      loading: false,
    }),
    fetchCommentsError: (state, action: PayloadAction<string>) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    addCommentSuccess: (state, action: PayloadAction<Comment>) => ({
      ...state,
      comments: [...state.comments, action.payload],
    }),
    deleteCommentSuccess: (state, action: PayloadAction<number>) => ({
      ...state,
      comments: state.comments.filter(comment => comment.id !== action.payload),
    }),
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsError,
  addCommentSuccess,
  deleteCommentSuccess,
} = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
