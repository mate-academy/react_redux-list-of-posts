import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

import * as commentsApi from '../../api/comments';

const initialState = {
  comments: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchUserComments',
  async (postId: number) => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

export const addNewComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const comments = await commentsApi.createComment(data);

    return comments;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,

  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, comments: action.payload };
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, loaded: action.payload };
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      return { ...state, hasError: action.payload };
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(fetchComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
    builder
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
      })
      .addCase(addNewComment.rejected, state => {
        return {
          ...state,
          hasError: true,
        };
      });
    builder
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(removeComment.rejected, state => {
        return {
          ...state,
          hasError: true,
        };
      });
  },
});

export const commentsActions = commentsSlice.actions;
