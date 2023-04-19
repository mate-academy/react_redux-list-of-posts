/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
// eslint-disable-next-line import/no-cycle
import { AppDispatch, RootState } from '../app/store';
import { Comment, CommentData } from '../types/Comment';

type StateType = {
  comments: Comment[],
  loaded: boolean;
  hasError: boolean;
};

const initialState: StateType = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postid:number) => getPostComments(postid),
);

export const addComment = createAsyncThunk(
  'addComment/fetch',
  (newComment: CommentData) => createComment(newComment),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(
      loadComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(
      addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
        state.loaded = true;
      },
    );

    builder.addCase(loadComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default commentsSlice.reducer;
export const { setComments } = commentsSlice.actions;

export const filterComments = (commentId: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setComments(
      getState().comment.comments.filter(comment => comment.id !== commentId),
    ));

    await deleteComment(commentId);
  };
};
