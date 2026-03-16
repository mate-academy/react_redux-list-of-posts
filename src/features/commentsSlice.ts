import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import {
  createCommentApi,
  deleteCommentApi,
  getPostCommentsApi,
} from '../api/comments';

interface CommentDataForCreation {
  name: string;
  email: string;
  body: string;
  postId: number;
}

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const posts = await getPostCommentsApi(postId);

    return posts;
  },
);

export const addComment = createAsyncThunk(
  'comments/create',
  async (commentData: CommentDataForCreation) => {
    const newComment = await createCommentApi(commentData);

    return newComment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteCommentApi(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      return { ...state, items: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
        items: [],
      }))
      .addCase(
        loadComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => ({
          ...state,
          loaded: true,
          hasError: false,
          items: action.payload,
        }),
      )
      .addCase(loadComments.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
        items: [],
      }))
      .addCase(addComment.pending, state => {
        return {
          ...state,
          hasError: false,
        };
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          return {
            ...state,
            items: [...state.items, action.payload],
            hasError: false,
            loaded: true,
          };
        },
      )
      .addCase(addComment.rejected, state => {
        return {
          ...state,
          hasError: true,
        };
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        return {
          ...state,
          items: state.items.filter(c => c.id !== action.payload),
          hasError: false,
        };
      })
      .addCase(deleteComment.rejected, state => {
        return {
          ...state,
          hasError: true,
        };
      });
  },
});

export const { setComments } = commentsSlice.actions;
