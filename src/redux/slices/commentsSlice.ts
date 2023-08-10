/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';

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

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number, { dispatch }) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(removeCommentById(commentId));

    return deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.items = [];
      state.hasError = false;
      state.loaded = false;
    },
    removeCommentById: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(comment => (
        comment.id !== action.payload
      ));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });

    builder
      .addCase(addComment.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });

    builder
      .addCase(removeComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(removeComment.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearComments, removeCommentById } = commentsSlice.actions;
export default commentsSlice.reducer;
