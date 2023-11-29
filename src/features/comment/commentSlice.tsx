/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsService from '../../services/comment';
import { Comment } from '../../types/Comment';

export type PostCommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostCommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetchLoad',
  (postId: number) => commentsService.fetchComments(postId),
);

export const createComment = createAsyncThunk(
  'comments/fetchAdd',
  (data: Omit<Comment, 'id'>) => commentsService.addComment(data),
);

export const deleteComment = createAsyncThunk(
  'comments/fetchDelete',
  (commentId: number, thunkAPI) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    thunkAPI.dispatch(remove(commentId));

    return commentsService.removeComment(commentId);
  },
);

const postCommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload,
      );
    },

    clear: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(
      loadComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(loadComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(
      createComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      },
    );
  },
});

export default postCommentsSlice.reducer;
export const { add, remove, clear } = postCommentsSlice.actions;
