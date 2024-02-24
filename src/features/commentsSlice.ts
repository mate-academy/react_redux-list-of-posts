/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  createComment,
  getPostComments,
  deleteComment as deleteCommentApi
} from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  loaded: boolean,
  hasError: boolean,
  items: Comment[],
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchComments = createAsyncThunk(
  'commentts/fetchCommentts',
  async (postId: number) => {
    const commentsData = await getPostComments(postId);

    return commentsData;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    const commentData = await createComment(data);

    return commentData;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    const idComment = await deleteCommentApi(commentId);

    return idComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state: CommentsState, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        item => item.id !== action.payload,
      );
    },
    clearComments: (state: CommentsState) => {
      state.items = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state: CommentsState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled,
        (state: CommentsState, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = action.payload;
        })
      .addCase(fetchComments.rejected, (state: CommentsState) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled,
        (state: CommentsState, action: PayloadAction<Comment>) => {
          return {
            ...state,
            loaded: true,
            items: [...state.items, action.payload],
          };
        })
      .addCase(addComment.rejected, (state: CommentsState) => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      })
      .addCase(deleteComment.fulfilled,
        (state: CommentsState) => {
          return {
            ...state,
            loaded: true,
            hasError: false,
          };
        });
  },
});

export const { setComment, removeComment, clearComments } = commentsSlice.actions;
