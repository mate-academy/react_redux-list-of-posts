/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  error: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  error: false,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (comment: Omit<Comment, 'id'>) => {
    const res = await commentsApi.createComment(comment);

    return res;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  (commentId: number) => {
    commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    // FETCH COMMENTS
    builder.addCase(fetchPostComments.pending, state => {
      state.loaded = false;
      state.error = false;
    });

    builder.addCase(
      fetchPostComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(fetchPostComments.rejected, state => {
      state.error = true;
      state.loaded = true;
    });

    // ADD COMMENT
    builder.addCase(
      createComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      },
    );

    builder.addCase(createComment.rejected, state => {
      state.error = true;
    });

    // REMOVE COMMENT
    builder.addCase(
      removeComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      },
    );

    builder.addCase(removeComment.rejected, state => {
      state.error = true;
    });
  },
});

export const { add, remove, setError } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
