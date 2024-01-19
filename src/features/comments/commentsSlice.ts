import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { loadingStatus, Status } from '../posts/postsSlice';

type CommentsState = {
  comments: Comment[],
  loaded: Status,
  hasError: string | null,
};

const initialState: CommentsState = {
  comments: [],
  loaded: loadingStatus.idle,
  hasError: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, comments: action.payload };
    },
    add: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
    delete: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        comments: state.comments.filter(
          comm => comm.id !== action.payload,
        ),
      };
    },
  },
});
