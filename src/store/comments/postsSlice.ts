import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { commentsAsync } from './commentsAsync';

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  error: string,
  submitting: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  error: '',
  submitting: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setInitialField: <IStateKey extends keyof CommentsState>(
      state: CommentsState, action: PayloadAction<IStateKey>) => ({
      ...state,
      [action.payload]: initialState[action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder
    // fetch comments
      .addCase(commentsAsync.fetchComments.pending, (state) => ({
        ...state,
        loaded: false,
      }))
      .addCase(commentsAsync.fetchComments.fulfilled,
        (state, action) => ({
          ...state,
          comments: action.payload,
          loaded: true,
        }))
      .addCase(commentsAsync.fetchComments.rejected,
        (state) => ({
          ...state, loaded: true, error: 'Error',
        }))
    // delete comment
      .addCase(commentsAsync.deleteComment.fulfilled,
        (state, action) => ({
          ...state,
          comments: state.comments
            .filter(com => com.id !== action.payload),
        }))
    // add comment
      .addCase(commentsAsync.addComment.pending, (state) => ({
        ...state,
        submitting: true,
      }))
      .addCase(commentsAsync.addComment.fulfilled, (state, action) => ({
        ...state,
        comments: [...state.comments, action.payload],
        submitting: false,
      }))
      .addCase(commentsAsync.addComment.rejected, (state) => ({
        ...state,
        error: 'Error',
      }));
  },
});

export const commentsAction = commentsSlice.actions;
export default commentsSlice.reducer;
