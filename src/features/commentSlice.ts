import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentPost = {
  comments: Comment[];
  loaded: boolean;
  error: boolean;
};

const initialState: CommentPost = {
  comments: [],
  loaded: false,
  error: false,
};

export const commentPost = createSlice({
  name: 'commentPost',
  initialState,
  reducers: {
    setCommentPost: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, comments: action.payload };
    },
    setLoadedComment: (state, action: PayloadAction<boolean>) => {
      return { ...state, loaded: action.payload };
    },
    setErrorComment: (state, action: PayloadAction<boolean>) => {
      return { ...state, error: action.payload };
    },
  },
});

export const CommentReducer = commentPost.reducer;
export const { setCommentPost, setLoadedComment, setErrorComment } =
  commentPost.actions;
