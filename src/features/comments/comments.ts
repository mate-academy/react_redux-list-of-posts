import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type InitialState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const deleteComments = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const addComments = createAsyncThunk(
  'comments/post',
  (comment: Comment) => {
    const newComment = createComment(comment);

    return newComment;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: false };
    });

    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        return { ...state, loaded: true, comments: action.payload };
      },
    );

    builder.addCase(init.rejected, state => {
      return { ...state, hasError: true, loaded: true };
    });

    builder.addCase(
      deleteComments.fulfilled,
      (state, action: PayloadAction<number>) => {
        return {
          ...state,
          comments: state.comments.filter(
            comment => comment.id !== action.payload,
          ),
        };
      },
    );

    builder.addCase(
      addComments.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);

        return { ...state, hasError: false, loaded: true };
      },
    );

    builder.addCase(addComments.rejected, state => {
      return { ...state, hasError: true };
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
