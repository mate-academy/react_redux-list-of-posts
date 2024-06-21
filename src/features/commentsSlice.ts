/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';
import { getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: false,
  visible: false,
};

export const fetchComments = createAsyncThunk(
  'comment/fetch',
  (postId: number) => getPostComments(postId),
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async ({ name, email, body, postId }: Comment, { rejectWithValue }) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId,
      });

      return newComment;
      // eslint-disable-next-line
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      await commentsApi.deleteComment(commentId);

      return commentId;
      // eslint-disable-next-line
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    toggleVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },

    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addCommentAsync.pending, state => {
      state.loaded = false;
    });

    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.loaded = true;
    });

    builder.addCase(addCommentAsync.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(deleteCommentAsync.pending, state => {
      state.loaded = false;
    });

    builder.addCase(deleteCommentAsync.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
      state.loaded = true;
    });

    builder.addCase(deleteCommentAsync.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { toggleVisible, setError, removeComment, addComment } =
  commentsSlice.actions;
