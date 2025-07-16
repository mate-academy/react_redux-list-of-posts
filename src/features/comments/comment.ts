import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

type CommentState = {
  comments: Comment[];
  loading: boolean;
  hasError: string;
};

const initialState: CommentState = {
  comments: [],
  loading: false,
  hasError: '',
};

export const initComment = createAsyncThunk(
  'comments/fetchComment',
  (userId: number) => getPostComments(userId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
    removeComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initComment.pending, state => {
        return { ...state, loading: true };
      })
      .addCase(
        initComment.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          return { ...state, comments: action.payload, loading: false };
        },
      )
      .addCase(initComment.rejected, state => {
        return {
          ...state,
          loading: false,
          hasError: 'no response to comments',
        };
      });
  },
});

export default commentsSlice.reducer;
export const { setComment, removeComment } = commentsSlice.actions;
